function verifyEmail(_emailstr) {
  // console.log("verifying this email: ", _emailstr);

  const emailRegularExpression = /(^[^@]+)@([^@.]+)\.{1}(\w{1,6}$)/;
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
  // TODO !! get rid of {} >< & and ; in the must at least
  (/[\[\]\+?.,|=`~!@:#";/$'>%<^&*(){_}-]/g).test(_password) ? null : notification = notification.concat("Your password must contain at least a special character: [@#!$%^&*()[]{}-_+/<'>;\":?.,|=`~]");
  !(/\s/g).test(_password) ? null : notification = notification.concat("Your password cannot contain any spaces at any point");
  !(_password.length < 8) ? null : notification = notification.concat("Your password's length insufficient. Passwords require at least 7 characters");
  !(_password.length > 39) ? null : notification = notification.concat("Your password's length excessivly long. Passwords require to be less than 40 characters");
  !(_password.length === 0) ? null : notification = notification.concat("No password was inputed!");

  ({ flag, notification } = { flag: !notification.length, notification: notification.length === 0 ? ["password format is proper: respect\'s all conditions"] : notification })
  // console.log(flag, notification)

  return { flag, notification }

}







function validateInputs(obj_input, err_msg = undefined) {

  // TODO !! make sure validation is catching & in inputs
  const preventInjectionsRegEx = /[<>;}{\&]/;

  for (const property in obj_input) {
    // console.log(`${property}: ${obj_input[property]}`);

    if (obj_input[property] == '' || preventInjectionsRegEx.test(obj_input[property])) {
      err_msg = `This field: ${property}, inputed value is not proper. Please modify`
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





function validateInputs_marketOrderTradeLocationSpecifics(_pkobmOr_LocationData, err_msg = undefined) {

  const isUndefined = (currentValue) => currentValue == undefined;

  if (Object.values(_pkobmOr_LocationData.geometry).every(isUndefined) && !err_msg) {
    err_msg = `Please, pick a location before submitting an order.`
  }

  console.log(err_msg)

  if (err_msg) {
    return err_msg
  } else {
    return undefined
  }
}



module.exports = { verifyEmail, verifyPassword, validateInputs, validateExpiry, validateInputs_marketOrderTradeLocationSpecifics }