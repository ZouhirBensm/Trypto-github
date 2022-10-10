function verifyEmail(_emailstr) {
  console.log("verifying this email: ", _emailstr);
  const emailRegularExpression = /(^[^@.]+)@([^@.]+)\.{1}(\w{1,6}$)/;
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
  console.log("\n\nverifying this password: ", _password)
  let flag = undefined, notification = [];

  (/\d/g).test(_password) ? null : notification = notification.concat("Your password must contain at least a digit [0-9]");
  (/[A-Za-z]/g).test(_password) ? null : notification = notification.concat("Your password must contain at least an alphabet character [A-Za-z]");
  (/[\[\]\+?.,|=`~!@:#";/$'>%<^&*(){_}-]/g).test(_password) ? null : notification = notification.concat("Your password must contain at least a special character: [@#!$%^&*()[]{}-_+/<'>;\":?.,|=`~]");
  !(/\s/g).test(_password) ? null : notification = notification.concat("Your password cannot contain any spaces at any point");
  !(_password.length < 8) ? null : notification = notification.concat("Your password's length insufficient. Passwords require at least 7 characters");
  !(_password.length > 39) ? null : notification = notification.concat("Your password's length excessivly long. Passwords require to be less than 40 characters");
  !(_password.length === 0) ? null : notification = notification.concat("No password was inputed!");

  ({ flag, notification } = { flag: !notification.length, notification: notification.length === 0 ? ["password format is proper: respect\'s all conditions"] : notification })
  // console.log(flag, notification)

  return { flag, notification }

}



function validateOrderInputs(_pkobmOr, err_msg = undefined) {

  const preventInjectionsRegEx = /[<>;}{\&]/;

  for (const property in _pkobmOr) {
    // console.log(`${property}: ${_pkobmOr[property]}`);

    if (_pkobmOr[property] == '' || preventInjectionsRegEx.test(_pkobmOr[property])) {
      err_msg = `This field: ${property}, inputed value is not proper. Please modify`
      break
    }

  }

  let expireAt = new Date(_pkobmOr.expirydate?.slice(0, 4), _pkobmOr.expirydate?.slice(5, 7) - 1, _pkobmOr.expirydate?.slice(8, 10), _pkobmOr.expirytime?.slice(0, 2), _pkobmOr.expirytime?.slice(3, 5))


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



module.exports = { verifyEmail, verifyPassword, validateOrderInputs, validateInputs_marketOrderTradeLocationSpecifics }