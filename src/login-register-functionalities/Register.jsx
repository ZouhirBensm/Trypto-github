import React from 'react';
import './styles/LoginRegister.css' 

class Register extends React.Component {

  constructor(){
    super()
    this.state = {
      notification: []
    }
    // These functions need to be put in a library
    this.verifyEmail = this.verifyEmail.bind(this)
    this.verifyPassword = this.verifyPassword.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.handleRegistrationCall = this.handleRegistrationCall.bind(this)
  }

  //generator function
  *handleValidation(e){
    e.preventDefault()
    const email = document.getElementById("loginregister").elements[0].value
    const password = document.getElementById("loginregister").elements[1].value
    let flag, notification = [];
    // console.log(e.target.parentNode)
    // console.log(document.getElementById("loginregister").elements);
    // console.log(email)
    // console.log(password)


    // Destructuring and assigning 
    ({flag, notification} = this.verifyEmail(email))
    console.log("after verifyEmail: ", flag, notification)    
    if(!flag) {
      // set the state of the notification to tell the user "Hey user email not good!"
      console.log("Hey user email not good!");
      // yield to end process
      yield {enviroment: "development", purpose: "logging", message: notification}
    } else {
      // set the state of the notification to tell component "Good email"
      console.log("Hey component email good!");
      // proceed to check the password
      
      ({flag, notification} = this.verifyPassword(password))
      console.log("after verifyPassword: ", flag, notification);
      if(!flag) {
        // set the state of the notification to tell User "Hey user password not Good"
        console.log("Hey user password not Good");
        // yield to end process
        yield {enviroment: "development", purpose: "logging", message: notification}
      } else { // finish and return
        // set the state of the notification to tell component "Good password"
        console.log("Hey component password good!");
        // proceed to make api call this.handleRegistration(email, password)
        // returns new flag, message
        ({flag, notification} = this.handleRegistrationCall(email, password))
        if(!flag) {
          // set the state of the notification to tell the user <message>
          // yield to end process with <message>
        } else {
          // set the state of the notification to tell component <message>
          // pass that state.notification <message> as a prop to render the home compnent
        }
      }
      
    }
    
    
  }
  async handleRegistrationCall (_email, _password){
    console.log("Making API call!")

    // crediential verified then you can do a call to register user on backend
    
    const response = await fetch(`${process.env.ROOT}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: _email,
        password: _password,
      })
    });
    console.log(response)
    if(response.status === 200){
      // window.location.href = `${process.env.ROOT}/`;

    }
    const data = await response.json()

    console.log(data)
    




    // if backend registration success return
    // return for handleRegistrationCall: flag + "User Account has been registered on the backend"
    // update page notification

    // if backend registration fails return
    // return for handleRegistrationCall: flag + "Server Error backend Was unable to register your proper filled inputs (Server Crash)"

    // finalYield a flag and then return the calling function *handleValidation(e) with this string `${returned message}`
  }

  



  

  render() {

    // const notifyDisplays = this.state.notification?.map((notification, index) => {
    //   return <div key={index}>{notification}</div>
    // })

    // console.log(notifyDisplays)
    
    return (
      // Template out this code
      <div id="container-log-reg">
        <form id="loginregister" className="form">
          <h3>Register React</h3>
          <label>Email</label>
          <input type="text" name="email" value="@example.com"/> 
          <label>Password</label>
          <input type="password" name="password" value="Zouhir123!"/> 
          <button type="submit" onClick={(e) => {
            let gen = this.handleValidation(e)
            let val = gen.next()
            console.log("Returned val on button click statements\nAfter let val = gen.next()\n", val)
            }
          }
          >Register</button>
        </form>
        {/* display the notification from the server here! */}
        {/* { notifyDisplays } */}
      </div>
    );
  }

  // __________________________ VERIFICATION __________________________


  verifyEmail(_emailstr){
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

  verifyPassword(_password){
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
    console.log(flag, notification)
    
    return {flag, notification}
  
  }
}

export default Register