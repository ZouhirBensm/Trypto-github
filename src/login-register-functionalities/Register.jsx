// import React from 'react';
import './styles/MgtUser.css' 
import {verifyEmail, verifyPassword} from '../../full-stack-libs/validations'



class Register extends React.Component {

  constructor(){
    super()
    this.state = {
      notification: []
    }
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
    ({flag, notification} = verifyEmail(email))
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
      
      ({flag, notification} = verifyPassword(password))
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
          this.constructor()
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
          <button type="submit" 
          onClick={
            async (e) => {
              let gen = this.handleValidation(e)
              let val = await gen.next()
              // await gen.next()
              console.log("Returned val on button click statements\nAfter let val = await gen.next()\n", val)
              // console.log("Returned val on button click statements\nAfter await gen.next()\n", gen)
            }
          }>Register</button>
        </form>
        {/* display the notification from the server here! */}
        { notifyDisplays }
      </div>
    );
  }
}

export default Register