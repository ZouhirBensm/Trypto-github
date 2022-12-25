const axios = require('axios');
var nodemailer = require('nodemailer');

const agendaDefineJobFunctions = require('../../full-stack-libs/define-agenda-job-functions/define-aganda-job-functions')

const HexForUnactiveUser = require('../../models/HexForUnactiveUser')
const User = require('../../models/User')
const Subscriber = require('../../models/Subscriber')
const UserAssociatedLocality = require('../../models/UserAssociatedLocality')

const { MongoError, GoogleAPIError } = require('../../custom-errors/custom-errors')

const ROLE = require('../../full-stack-libs/Types/Role')
const ENV = require('../../config/base')


const { utils } = require('../../full-stack-libs/utils.address')


function instantiateHexForUnactiveUserMiddleware(req, res, next) {
  let hex_for_unactive_user_instance
  let subscriber_instance

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


  res.locals.hex_for_unactive_user_instance = hex_for_unactive_user_instance
  res.locals.subscriber_instance = subscriber_instance

  return next()
}


function instantiateUserMiddleware(req, res, next) {
  let user_instance

  user_instance = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  })

  user_instance.hexforunactiveuserID = res.locals.hex_for_unactive_user_instance._id
  user_instance.userassociatedlocalityID = null



  res.locals.hex_for_unactive_user_instance.userID = user_instance._id



  res.locals.user_instance = user_instance

  return next()
}


async function ifLocalityOrganizeAssociatedLocalityMiddleware(req, res, next) {
  if (!(req.body.lat && req.body.lng)) {
    return next()
  }

  // TODO ! have a lib for this type of functionality used on back and front end
  const API_KEY = ENV.console_cloud_google_api_key;
  const latitude = parseFloat(req.body.lat);
  const longitude = parseFloat(req.body.lng);

  let response
  try {
    response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`)
  } catch (error) {
    err = new GoogleAPIError(`Call to maps.googleapis.com error.`, error.code)
    return next(err)
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
    userID: res.locals.user_instance._id
  })

  res.locals.user_instance.userassociatedlocalityID = user_associated_locality_instance._id


  let ret_user_associated_locality_save
  try {
    ret_user_associated_locality_save = await user_associated_locality_instance.save()
  } catch (err) {
    err = new MongoError(`Was Unable to save user_associated_locality_instance. Error: ${err.message}`, err.code)
    return next(err)
  }


  // Save returned
  res.locals.ret_user_associated_locality_save = ret_user_associated_locality_save


  return next()
}




async function ifSubscriberInstantiateSubscriberMiddleware(req, res, next) {
  if (req.body.plan == ROLE.USER.NOTSUBSCRIBER) {
    return next()
  }



  res.locals.subscriber_instance.userID = res.locals.user_instance._id

  res.locals.user_instance.subscriptionID = res.locals.subscriber_instance._id

  let ret_subinfo_save

  try {
    ret_subinfo_save = await res.locals.subscriber_instance.save()
  } catch (err) {
    err = new MongoError(`You have successfully subscribed on paypal's servers, but not on BidBlock's servers' because of this error: ${err.message}`, err.code)
    return next(err)
  }

  // Save returned
  res.locals.ret_subinfo_save = ret_subinfo_save
  
  return next()
}



async function saveHex4UnactiveUserMiddleware(req, res, next) {
  
  let ret_hex_for_unactive_user_save

  try {
    ret_hex_for_unactive_user_save = await res.locals.hex_for_unactive_user_instance.save()
  } catch (err) {
    err = new MongoError(`Could not save hex_for_unactive_user_instance, ${err.message}`, err.code)
    return next(err)
  }

  // Save returned
  res.locals.ret_hex_for_unactive_user_save = ret_hex_for_unactive_user_save

  return next()
}


async function saveUserMiddleware(req, res, next) {

  let ret_user_save

  try {
    ret_user_save = await res.locals.user_instance.save()
  } catch (err) {
    err = new MongoError(`You have successfully subscribed on paypal's servers, but not on BidBlock's servers' because of this error: ${err.message}`, err.code)
    return next(err)
  }

  console.log("\n\n\nSaved user information\n\n", ret_user_save._id, ' vs ', res.locals.user_instance._id)


  // Save returned
  res.locals.ret_user_save = ret_user_save


  return next()
}



function doubleCheckSaveMiddleware(req, res, next) {

  let double_check_expression = res.locals.ret_hex_for_unactive_user_save && res.locals.ret_user_save && (req.body.plan == ROLE.USER.SUBSCRIBER.BASIC ? !!res.locals.ret_subinfo_save : true) && (req.body.lat && req.body.lng ? !!res.locals.ret_user_associated_locality_save: true)


  if (!(double_check_expression)) {
    let e = new MongoError(`The user,${req.body.plan == ROLE.USER.SUBSCRIBER.BASIC ? ' sub info,' : ''}, ${req.body.lat && req.body.lng ? ' locality info,' : ''}  or hex save f'ed up!`)
    return next(e)
  }

  return next()

}

async function setAgendaJobToDeleteUserIfStillNotActive(req, res, next) {

  const jobname = `Delete registered user ${res.locals.ret_user_save._id}, if account stays unactive`

  agendaDefineJobFunctions.deleteUserIfStillDidNotActivate(jobname, res.locals.ret_user_save._id)


  // FOR TESTING
  // var deleteUnactiveUserOn = new Date(res.locals.ret_user_save.registrationDateTime.setMinutes(res.locals.ret_user_save.registrationDateTime.getMinutes()+2));

  // At 3 months mark, delete the user
  var deleteUnactiveUserOn = new Date(res.locals.ret_user_save.registrationDateTime.setMonth(res.locals.ret_user_save.registrationDateTime.getMonth()+3));

  await agenda.schedule(deleteUnactiveUserOn, jobname);

  return next()
}


async function mailConfirmLinkMiddleware(req, res, next) {
  let now
  let transporter
  let info
  var mailOptions

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
    to: res.locals.ret_user_save.email,
    subject: `${ENV.domain_without_protocol}, Confirm your Account Now!`,
    text: `Date: ${now},\n\nWelcome ${res.locals.ret_user_save.username}!\n\nPlease confirm your ${ENV.domain_without_protocol} account now, by clicking on this link:\n\n${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/confirm-user-email/${res.locals.ret_user_save._id}/${res.locals.ret_hex_for_unactive_user_save.hexfield}\n\nThank you!`
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

  return next()
  
}









registerMiddleware = {
  instantiateHexForUnactiveUserMiddleware: instantiateHexForUnactiveUserMiddleware,
  instantiateUserMiddleware: instantiateUserMiddleware,
  ifLocalityOrganizeAssociatedLocalityMiddleware: ifLocalityOrganizeAssociatedLocalityMiddleware,
  ifSubscriberInstantiateSubscriberMiddleware: ifSubscriberInstantiateSubscriberMiddleware,
  saveHex4UnactiveUserMiddleware: saveHex4UnactiveUserMiddleware,
  saveUserMiddleware: saveUserMiddleware,
  doubleCheckSaveMiddleware: doubleCheckSaveMiddleware,
  setAgendaJobToDeleteUserIfStillNotActive: setAgendaJobToDeleteUserIfStillNotActive,
  mailConfirmLinkMiddleware: mailConfirmLinkMiddleware,
}


module.exports = registerMiddleware