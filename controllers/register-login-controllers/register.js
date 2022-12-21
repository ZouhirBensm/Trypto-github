const axios = require('axios');
//We import the User model
const User = require('../../models/User')
const HexForUnactiveUser = require('../../models/HexForUnactiveUser')
const UserAssociatedLocality = require('../../models/UserAssociatedLocality')

const Subscriber = require('../../models/Subscriber')
const ROLE = require('../../full-stack-libs/Types/Role')
// const bcrypt = require('bcrypt')

const ENV = require('../../config/base')

var nodemailer = require('nodemailer');

const httpStatus = require("http-status-codes")
const { ValidationError, LoggingInError, MongoError } = require('../../custom-errors/custom-errors')

const { utils } = require('../../full-stack-libs/utils.address')



async function registerController(req, res, next) {

  console.log("\nin registerController:\n__________________________\n\n")


  console.log("-----INFO!!!\n\n", req.body)


  let user_instance
  let hex_for_unactive_user_instance
  let subscriber_instance
  let ret_hex_for_unactive_user_save, ret_user_save, ret_subinfo_save, ret_user_associated_locality_save
  let now
  let transporter
  let info
  var mailOptions

  hex_for_unactive_user_instance = new HexForUnactiveUser()


  switch (req.body.plan) {
    case ROLE.USER.NOTSUBSCRIBER:
      req.body.role = ROLE.USER.NOTSUBSCRIBER
      break;

    case ROLE.USER.SUBSCRIBER.BASIC:
      req.body.role = ROLE.USER.SUBSCRIBER.BASIC

      subscriber_instance = new Subscriber({
        paypal_subscriptionID: req.body.paypal_subscriptionID,
        paypal_plan_id: req.body.paypal_plan_id,
        paypal_product_id: req.body.paypal_product_id,
        plan: req.body.plan
      })


      break;

    default:
      break;
  }


  user_instance = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  })

  user_instance.hexforunactiveuserID = hex_for_unactive_user_instance._id
  hex_for_unactive_user_instance.userID = user_instance._id
  user_instance.userassociatedlocalityID = null
  

  if (req.body.lat && req.body.lng) {

    const API_KEY = ENV.console_cloud_google_api_key;
    const latitude = parseFloat(req.body.lat);
    const longitude = parseFloat(req.body.lng);
  
  
    let response
    try {
      response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`)
    } catch (error) {
      // TODO add some error handling
      console.log(error);
    }
  
    let address = response.data.results[0].formatted_address
    const addressArray = response.data.results[0].address_components;
  
    let st_number = utils.getStreetNumber(addressArray),
      st = utils.getStreet(addressArray),
      neigh = utils.getNeighborhood(addressArray),
      province_state = utils.getProvinceState(addressArray),
      city = utils.getCity(addressArray),
      country = utils.getCountry(addressArray)
  
  
    address = (address) ? address : undefined,
    st_number = (st_number) ? st_number : undefined
    st = (st) ? st : undefined
    neigh = (neigh) ? neigh : undefined
    province_state = (province_state) ? province_state : undefined
    city = (city) ? city : undefined
    country = (country) ? country : undefined
  
    console.log(address)
    console.log(st_number)
    console.log(st)
    console.log(neigh)
    console.log(province_state)
    console.log(city)
    console.log(country)


    let user_associated_locality_instance = new UserAssociatedLocality({
      geometry: {
        lat: req.body.lat,
        lng: req.body.lng
      },
      location: {
        address: address,
        st_number: st_number,
        st: st,
        neigh: neigh,
        province_state: province_state,
        city: city,
        country: country
      },
      userID: user_instance._id
    })


    user_instance.userassociatedlocalityID = user_associated_locality_instance._id

    try {
      ret_user_associated_locality_save = await user_associated_locality_instance.save()
    } catch (err) {
      err = new MongoError(`Was Unable to save user_associated_locality_instance. Error: ${err.message}`, err.code)
      return next(err)
    }

    
  }




  


  if (req.body.plan == ROLE.USER.SUBSCRIBER.BASIC) {
    subscriber_instance.userID = user_instance._id
    user_instance.subscriptionID = subscriber_instance._id

    try {
      ret_subinfo_save = await subscriber_instance.save()
    } catch (err) {
      err = new MongoError(`You have successfully subscribed on paypal's servers, but not on BidBlock's servers' because of this error: ${err.message}`, err.code)
      return next(err)
    }

    // console.log("\n\n\nSaved subscriber information\n\n", ret_subinfo_save)
  }



  try {
    ret_hex_for_unactive_user_save = await hex_for_unactive_user_instance.save()
  } catch (err) {
    err = new MongoError(`Could not save hex_for_unactive_user_instance, ${err.message}`, err.code)
    return next(err)
  }

  try {
    ret_user_save = await user_instance.save()
  } catch (err) {
    err = new MongoError(`You have successfully subscribed on paypal's servers, but not on BidBlock's servers' because of this error: ${err.message}`, err.code)
    return next(err)
  }

  console.log("\n\n\nSaved user information\n\n", ret_user_save._id, ' vs ', user_instance._id)





  


  let double_check_expression = ret_hex_for_unactive_user_save && ret_user_save && (req.body.plan == ROLE.USER.SUBSCRIBER.BASIC ? !!ret_subinfo_save : true) && (req.body.lat && req.body.lng ? !!ret_user_associated_locality_save: true)

  // if (true) {
  if (!(double_check_expression)) {
    let e = new MongoError(`The user,${req.body.plan == ROLE.USER.SUBSCRIBER.BASIC ? ' sub info,' : ''}, ${req.body.lat && req.body.lng ? ' locality info,' : ''}  or hex save f'ed up!`)
    return next(e)
  }


  now = new Date()

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ENV.bidblock_email,
      pass: ENV.bidblock_email_app_pass_code
    }
  });

  mailOptions = {
    from: ENV.bidblock_email,
    to: req.body.email,
    subject: `${ENV.domain_without_protocol}, Confirm your Account Now!`,
    text: `Date: ${now},\n\nWelcome ${ret_user_save.username}!\n\nPlease confirm your ${ENV.domain_without_protocol} account now, by clicking on this link:\n\n${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/confirm-user-email/${ret_user_save._id}/${ret_hex_for_unactive_user_save.hexfield}\n\nThank you!`
  };


  try {
    info = await transporter.sendMail(mailOptions);
  } catch (e) {
    return next(e)
  }

  if (!info) {
    let e = new Error("Message not sent")
    return next(e)
  }




  let success_msg = (
    req.body.plan == ROLE.USER.SUBSCRIBER.BASIC ? `Subscriber ${req.body.username} successfully created, with the paypal subscriber ID: ${req.body.paypal_subscriptionID}` :
      req.body.plan == ROLE.USER.NOTSUBSCRIBER ? `User ${ret_user_save.username} successfully created` :
        null
  )


  // console.log(success_msg)


  return res.status(200).json({
    server: {
      message: [success_msg],
    }
  })





}

module.exports = { registerController }