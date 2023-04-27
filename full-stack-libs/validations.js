function verifyUsername(_username){

  let flag = undefined, notification = [];

  (_username.length < 3) ? notification = notification.concat("Your username length is unsufficient. Usernames require at least 4 characters") : null ;
  (/[{}><'`"&;]/g).test(_username) ? notification = notification.concat("Your username cannot contain these characters: {}><'`\"&;") : null ;
  (/\s/g).test(_username) ? notification = notification.concat("Your username cannot contain spaces.") : null ;

  ({ flag, notification } = { flag: !notification.length, notification: notification.length === 0 ? ["Username format is proper: respect\'s all conditions"] : notification })

  return { flag, notification }

}



function verifyEmail(_emailstr) {
  // console.log("verifying this email: ", _emailstr);

  
  // allows spaces old version used
  // const emailRegularExpression = /(^[^@]+)@([^@.]+)\.{1}(\w{1,6}$)/;
  // does not allows spaces old version used
  const emailRegularExpression = /(^[^@\s]+)@([^@.\s]+)\.{1}(\w{1,6}$)/;
  // const emailRegularExpression = /(^[^@\s]+)@([^@.\s]+)\.{1}([^@.\s]{1,6}$)/;
  const EmailVerif_status = emailRegularExpression.test(_emailstr)
  // const arrayReg = emailRegularExpression.exec(_emailstr)

  if (EmailVerif_status) {
    return {
      flag: true,
      notification: ['email format is proper: <name>@<email-provider>.<extention>']
    }
  } else {
    return {
      flag: false,
      notification: ['email format is invalid i.e not as such: <name>@<email-provider>.<extention>']
    }
  }
}

function verifyPassword(_password) {
  // console.log("\n\nverifying this password: ", _password)
  let flag = undefined, notification = [];

  (/\d/g).test(_password) ? null : notification = notification.concat("Your password must contain at least a digit [0-9]");
  (/[A-Za-z]/g).test(_password) ? null : notification = notification.concat("Your password must contain at least an alphabet character [A-Za-z]");
  (/[\[\]\+?.,|=~!@:#/$%^*()_-]/g).test(_password) ? null : notification = notification.concat("Your password must contain at least a special character: @#!$%^*()[]-_+/:?.,|=~");
  (/[{}><'`"&;]/g).test(_password) ? notification = notification.concat("Your password cannot contain these characters: {}><'`\"&;") : null ;

  // (/[\[\]\+?.,|=`~!@:#";/$'>%<^&*(){_}-]/g).test(_password) ? null : notification = notification.concat("Your password must contain at least a special character: [@#!$%^&*()[]{}-_+/<'>;\":?.,|=`~]");

  !(/\s/g).test(_password) ? null : notification = notification.concat("Your password cannot contain any spaces at any point");
  !(_password.length < 8) ? null : notification = notification.concat("Your password's length insufficient. Passwords require at least 7 characters");
  !(_password.length > 39) ? null : notification = notification.concat("Your password's length excessivly long. Passwords require to be less than 40 characters");
  !(_password.length === 0) ? null : notification = notification.concat("No password was inputed!");

  ({ flag, notification } = { flag: !notification.length, notification: notification.length === 0 ? ["password format is proper: respect\'s all conditions"] : notification })
  // console.log(flag, notification)

  return { flag, notification }

}



// TODO maintainers, process to allow the orders to go through
// + 
// TODO design= logo, icons/font awsome, dimmensions, implementation css mobile/desktop, customs pictogrammes, animations, mobile touch events


// V2
// TODO Wallet system
// TODO feedback, review, stars, collecte de donnees, pouces vert, rouge, orange
// TODO badges to confirmation de email (required), phone number (optional) - Number code, ID verification (optional)
// TODO bid system for items. UI for past bids and highest current bidder, after
// TODO shipping mechanisms
// TODO les 2 interfaces shipping and BB escrow system
// 1- systemes d'achat
// 2 - systemes de retours 
// TODO Premiums sur garanties, 3 ,4 % de l'article => vendeur peut accept ou pas le retour => 
// TODO algo keywords ai to allows orders



function validateInputs(obj_input, err_msg = undefined) {

  // \*
  const preventInjectionsRegEx = /[<>;`}(")'{\&]/;

  for (const property in obj_input) {
    console.log(`${property}: ${obj_input[property]}`);

    if (obj_input[property] == '' || preventInjectionsRegEx.test(obj_input[property])) {
      err_msg = `This field: ${property}, inputed value is not proper, i.e. empty or contains these chars: *()<>\`;"}'{&. Please modify`
      break
    }

  }

  if (err_msg) {
    return err_msg
  } else {
    return undefined
  }
}

function validateExpiry(obj_input, err_msg = undefined) {


  let expireAt = new Date(obj_input.expirydate?.slice(0, 4), obj_input.expirydate?.slice(5, 7) - 1, obj_input.expirydate?.slice(8, 10), obj_input.expirytime?.slice(0, 2), obj_input.expirytime?.slice(3, 5))


  if (expireAt < new Date() && !err_msg) {
    err_msg = `Expiry date & time cannot set before now. Please modify`
  }

  if (err_msg) {
    return err_msg
  } else {
    return undefined
  }
}





function validate_location_geometry_inputs(_pkobmOr_LocationData, err_msg = undefined) {

  const isUndefined = (currentValue) => currentValue == undefined;

  if (Object.values(_pkobmOr_LocationData.geometry).every(isUndefined) && !err_msg) {
    err_msg = `Please, pick a location before submitting.`
  }

  console.log(err_msg)

  if (err_msg) {
    return err_msg
  } else {
    return undefined
  }
}


function arePasswordsEqual(obj) {
  let err_msg

  if(obj._password != obj._password_check) {
    err_msg = "Password and confirmation do not match please edit and retry."
  } 

  if (err_msg) {
    return err_msg
  } else {
    return undefined
  }
}


function validateInputsAgainstInjection(obj_input, err_msg = undefined) {

  const preventInjectionsRegEx = /[<>;`}(")'{\&]/;

  for (const property in obj_input) {
    console.log(`${property}: ${obj_input[property]}`);

    if (preventInjectionsRegEx.test(obj_input[property])) {
      err_msg = `This field: ${property}, inputed value is not proper, i.e. Contains these chars: ()<>\`;"}'{&. Please modify.`
      break
    }
  }

  if (err_msg) {
    return err_msg
  } else {
    return undefined
  }
}



module.exports = { verifyUsername, verifyEmail, verifyPassword, validateInputs, validateExpiry, validate_location_geometry_inputs, arePasswordsEqual, validateInputsAgainstInjection }