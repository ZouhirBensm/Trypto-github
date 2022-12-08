// import React from 'react';

import '../style/reactDivMobile.css'
import './styles/Register.css'
import {verifyEmail, verifyPassword, verifyUsername} from '../../full-stack-libs/validations'
import {generate_fake_subscription_ID} from '../../full-stack-libs/utils'
import ROLE from '../../full-stack-libs/Types/Role'




class Register extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      notification: []
    }
    this.handleValidation = this.handleValidation.bind(this)
    this.handleRegistrationCall = this.handleRegistrationCall.bind(this)
    // console.log("step in register: ", this.props.step)
    this.NOTSUBSCRIBERPlanRegistrationProcess = this.NOTSUBSCRIBERPlanRegistrationProcess.bind(this)
  }

  

  async NOTSUBSCRIBERPlanRegistrationProcess() {
    // console.log("heyy")
    let flag, notification
    console.log({username: this.props.username, email: this.props.email, password: this.props.password, plan: this.props.plan});

    ({flag, notification} = await this.handleRegistrationCall(this.props.username, this.props.email, this.props.password, this.props.plan))

    console.log("NOTSUBSCRIBERPlanRegistrationProcess()-> flag, notification: ", flag, notification)

    if (flag){
      this.setState({notification: notification})
      this.props.setStateStep(4)
    } else {
      this.setState({notification: notification})
    }
    return
  }



  async handleRegistrationCall (_username, _email, _password, _plan){
    console.log("Making API call!")
    
    const response = await fetch(`/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: _username,
        email: _email,
        password: _password,
        plan: _plan,
      })
    })
   
    let data = await response.json()
    console.log("handleRegistrationCall()-> response, data: ", response, data)


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
          notification: typeof data.error.message === 'string'? [data.error.message]: data.error.message
        }
      default:
        break;
    }

  }




  



  render() {

    console.log(typeof this.state.notification)
    let notifyDisplays
    notifyDisplays = this.state.notification?.map((notification, index) => {
      return <div key={index}>{notification}</div>
    })

    console.log(notifyDisplays)
    


    // ___________________________________________________
    return (
      // Template out this code
      <div id="container-log-reg">
        <form id="loginregister" className="form">
          <h3>Register React</h3>
          <label>Username</label>
          <input type="text" name="username" value={this.props.username} onChange={(e) => this.props.handleChange("username", e)} placeholder="Zouhir"/> <br/>
          <label>Email</label>
          <input type="text" name="email" value={this.props.email} onChange={(e) => this.props.handleChange("email", e)} placeholder="z@example.com"/> <br/>
          <label>Password</label>
          <input type="text" name="password" value={this.props.password} onChange={(e) => this.props.handleChange("password", e)} placeholder="Zouhir123!"/> <br/>

          <input type="text" name="hny_spm"/>

          <button 
          onClick={
            async (e) => {
              e.preventDefault()

              let returnedValue1 = await this.asyncFunctionToreturnValidation()
              await this.planRegistrationFunction(returnedValue1)

              return
            }

          }>Register</button>
          
        </form> <br/>
        {/* display the notification from the server here! */}
        { notifyDisplays } <br/>
        <button onClick={(e) => this.props.setStateStep(1)}> Previous </button>
        {/* <button onClick={(e) => this.props.setStateStep('3')}> Next </button> */}
      </div>
    );
  }
  // ___________________________________________________


  async planRegistrationFunction(returnedValue1){
    console.log("onClick()-> returnedValue1: ", returnedValue1)
    
    const hny_spm = document.getElementById("loginregister").elements["hny_spm"].value
    
    if (hny_spm != "") {
      let fake_success_message
      if(this.props.plan == ROLE.USER.SUBSCRIBER.BASIC){
        const fake_paypal_subscriptionID = generate_fake_subscription_ID();
        fake_success_message = `Subscriber ${this.props.username} successfully created, with the paypal subscriber ID: ${fake_paypal_subscriptionID}`
      } else {
        fake_success_message = `User ${this.props.username} successfully created`
      }

      const rand_delta = Number((Math.random() * 100).toFixed(2))
      const fake_api_delay = 900 + rand_delta
      console.log("fake_api_delay--->", fake_api_delay)

      setTimeout(()=>{
        this.setState({notification: [fake_success_message]})
        this.props.setStateStep(4)
        console.log(1)
        return
      },
      fake_api_delay)
      console.log(2)

      return
    }
    console.log(3)

    if (returnedValue1.value.status != "success"){
      return
    }
  
    // Validation successful
    switch (this.props.plan) {
      case "NOTSUBSCRIBER":
        await this.NOTSUBSCRIBERPlanRegistrationProcess()
        break;
      case "BASIC":
        this.props.nextStep()
        break;
      default:
        console.error("Plan not reconized")
        break;
    }

    return
  }


  async asyncFunctionToreturnValidation(){
    let gen = this.handleValidation()
    let val = await gen.next()
    console.log("asyncFunctionToreturnValidation()->val: ", val)
    return val
  }

  //generator function
  async *handleValidation(){
    // e.preventDefault()
    const username = document.getElementById("loginregister").elements[0].value
    const email = document.getElementById("loginregister").elements[1].value
    const password = document.getElementById("loginregister").elements[2].value

    let flag, notification = [];

    ({flag, notification} = verifyUsername(username))

    if(!flag) {
      this.setState({notification: notification})
      yield {status: "failed", yield_level: 1/4, broke_and_caughtOnChecking: "username", message: notification}
    }


    ({flag, notification} = verifyEmail(email))

    if(!flag) {
      this.setState({notification: notification})
      yield {status: "failed", yield_level: 2/4, broke_and_caughtOnChecking: "email", message: notification}
    }

    // EMAIL GOOD
    ({flag, notification} = verifyPassword(password))

    if(!flag) {
      this.setState({notification: notification})
      yield {status: "failed", yield_level: 3/4, broke_and_caughtOnChecking: "password", message: notification}
    }

    // PASSWORD GOOD
    ({flag, notification} = await this.checkIfEmailDuplicateInDatabase(email, username))
    
    if(!flag) {
      this.setState({notification: notification})
      yield {status: "failed", yield_level: 4/4, broke_and_caughtOnChecking: "checking email, or, and username duplicates", message: notification}
    }


    // NO EMAIL DUPLICATE
    this.setState({notification: []})
    return {status: "success", yield_level: 4/4, broke_and_caughtOnChecking: null, message: notification}


  }

  async checkIfEmailDuplicateInDatabase (_email, _username){
    // console.log("Making API call!")
    let response
    let data

    response = await fetch(`/check/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: _email,
        username: _username,
      })
    })

    data = await response.json()
   
    // console.log(response)
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
          notification: typeof data.error.message === 'string'? [data.error.message]: data.error.message
        }
      default:
        break;
    }
    // finalYield a flag and then return the calling function *handleValidation(e) with this string `${returned message}`
  }



}

export default Register