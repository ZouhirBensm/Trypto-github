function verifyEmail(_emailstr){
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

function verifyPassword(_password){
  console.log("\n\nverifying this password: ", _password)
  let flag = undefined, notification = [];

  (/\d/g).test(_password)? null : notification = notification.concat("Your password must contain at least a digit [0-9]");
  (/[A-Za-z]/g).test(_password)? null : notification = notification.concat("Your password must contain at least an alphabet character [A-Za-z]");
  (/[\[\]\+?.,|=`~!@:#";/$'>%<^&*(){_}-]/g).test(_password)? null : notification = notification.concat("Your password must contain at least a special character: [@#!$%^&*()[]{}-_+/<'>;\":?.,|=`~]");
  !(/\s/g).test(_password)? null : notification = notification.concat("Your password cannot contain any spaces at any point");
  !(_password.length < 8) ? null: notification = notification.concat("Your password's length insufficient. Passwords require at least 7 characters");
  !(_password.length > 39) ? null: notification = notification.concat("Your password's length excessivly long. Passwords require to be less than 40 characters");
  !(_password.length === 0) ? null: notification = notification.concat("No password was inputed!");

  ({flag, notification} =  {flag: !notification.length, notification: notification.length === 0? ["password format is proper: respect\'s all conditions"]:notification})
  // console.log(flag, notification)
  
  return {flag, notification}

}

module.exports =  {verifyEmail, verifyPassword}