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
  async *handleValidation(e){
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
      this.setState({notification: notification})
      console.log("Hey user email not good!");
      // yield to end process
      yield {yield_level: 1, number_of_max_yield_levels: 3, inProcessChecking: "email", message: notification}
    } else {
      // set the state of the notification to tell component "Good email"
      console.log("Hey component email good!");
      // proceed to check the password
      
      ({flag, notification} = this.verifyPassword(password))
      console.log("after verifyPassword: ", flag, notification);
      if(!flag) {
        // set the state of the notification to tell User "Hey user password not Good"
        this.setState({notification: notification})
        console.log("Hey user password not Good");
        // yield to end process
        yield {yield_level: 2, number_of_max_yield_levels: 3, inProcessChecking: "password", message: notification}
      } else { // finish and return
        // set the state of the notification to tell component "Good password"
        console.log("Hey component password good!");
        // proceed to make api call this.handleRegistration(email, password)
        // returns new flag, message
        ({flag, notification} = await this.handleRegistrationCall(email, password))
        console.log("\n\nAfter API call, we are left with: ", flag, notification)
        if(!flag) {
          // set the state of the notification to tell the user <message>
          this.setState({notification: notification})
          console.log("Hey component the server failed")
          // yield the final return to end process with server error notification
          // return {yield_level: 3, number_of_max_yield_levels: 3, inProcessChecking: "POST /users/register endpoint", message: notification}
        } else {
          // TODO
          // post or get(query string) the message/notification then serve it from the server, have it as a pop up if you want
          window.location.href = `${process.env.ROOT}/`;

        }
        return {yield_level: 3, number_of_max_yield_levels: 3, inProcessChecking: "POST /users/register endpoint", message: notification}
      }
      
    }
    
    
  }
  async handleRegistrationCall (_email, _password){
    console.log("Making API call!")
    
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
    })
   
    
    

    // console.log(response)
    let data = await response.json()
    // console.log(data)

    
    switch (response.status) {
      case 200:
        return {
          flag: true,
          notification: data.server.message
        }
        // update page notification
      case 500:
        return {
          flag: false,
          notification: data.error.message
        }
      default:
        break;
    }


    // finalYield a flag and then return the calling function *handleValidation(e) with this string `${returned message}`
  }

  



  

  render() {

    const notifyDisplays = this.state.notification?.map((notification, index) => {
      return <div key={index}>{notification}</div>
    })

    console.log(notifyDisplays)
    
    return (
      // Template out this code
      <div id="container-log-reg">
        <form id="loginregister" className="form">
          <h3>Register React</h3>
          <label>Email</label>
          <input type="text" name="email"/> 
          <label>Password</label>
          <input type="password" name="password"/> 
          <button type="submit" onClick={
            async (e) => {
              let gen = this.handleValidation(e)
              let val = await gen.next()
              // await gen.next()
              console.log("Returned val on button click statements\nAfter let val = await gen.next()\n", val)
              // console.log("Returned val on button click statements\nAfter await gen.next()\n", gen)
            }
          }
          >Register</button>
        </form>
        {/* display the notification from the server here! */}
        { notifyDisplays }
      </div>
    );
  }

  // __________________________ VERIFICATION __________________________


  verifyEmail(_emailstr){
    console.log(" __________________________ VERIFICATION __________________________");
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