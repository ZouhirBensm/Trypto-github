import React from 'react';
import './styles/LoginRegister.css' 

class Register extends React.Component {

  constructor(){
    super()
    this.state = {
      notification: []
    }
    this.verifyEmail = this.verifyEmail.bind(this)
    // These functions need to be put in a library
    this.verifyPassword = this.verifyPassword.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.handleRegistrationCall = this.handleRegistrationCall.bind(this)
  }

  //generator function
  *handleValidation(e){
    e.preventDefault()
    const email = document.getElementById("loginregister").elements[0].value
    const password = document.getElementById("loginregister").elements[1].value
    let flag, notification
    // console.log(e.target.parentNode)
    // console.log(document.getElementById("loginregister").elements);
    // console.log(email)
    // console.log(password)


    // Destructuring and assigning 
    ({flag = flag_value, notification = notification_value} = this.verifyEmail(email))


    console.log(flag, notification)    
    if(!flag) {
      // set the state of the notification to tell the user "Hey user email not good!"
      console.log("Hey user email not good!");
      // yield to end process
      yield `${email} is valid`
    } else {
      // set the state of the notification to tell component "Good email"
      console.log("Hey component email good!");
      // proceed to check the password
      
      ({flag = flag_value, notification = notification_value} = this.verifyPassword(password))
      console.log(flag, notification);
      if(!flag) {
        // set the state of the notification to tell User "Hey user password not Good"
        console.log("Hey user password not Good");
        // yield to end process
        yield `${password} is valid`
      } else {
        // set the state of the notification to tell component "Good password"
        console.log("Hey component password good!");
        // proceed to make api call this.handleRegistration(email, password)
        // returns flag, message
        this.handleRegistrationCall(email, password)
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
  handleRegistrationCall (_email, _password){
    console.log("Making API call!")

    // crediential verified then you can do a call to register user on backend
    // fetch(`${process.env.ROOT}/users/register`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: _email,
    //     password: _password,
    //   })
    // })
    // .then(response => {
    //   // console.log("api ress: ", response); 
    //   return response.json()
    // })
    // .then(data => {
    //   console.log(data.data[0])
    //   if(data.data[0] === "success"){
    //     // window.location.href = `${process.env.ROOT}/`;
    //   }
    // })



    // if backend registration success return
    // return for handleRegistrationCall: flag + "User Account has been registered on the backend"
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
          <input type="text" name="email" value="y@example.com"/> 
          <label>Password</label>
          <input type="password" name="password" value="Zouhir123"/> 
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
        notification: ['email is good']
      }
    } else {
      return {
        flag: false,
        notification: ['email is bad']
      }
    }
  }

  verifyPassword(_password){
    console.log("verifying this password: ", _password)
    
    if (true) {
      return {
        flag: true,
        notification: ['password is good']
      }
    } else {
      return {
        flag: false,
        notification: ['password is bad']
      }
    }
  }
}

export default Register