// import React from 'react';

import '../style/reactDivMobile.css'
import {verifyEmail, verifyPassword} from '../../full-stack-libs/validations'
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";



class Register extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      notification: []
    }
    this.handleValidation = this.handleValidation.bind(this)
    this.handleRegistrationCall = this.handleRegistrationCall.bind(this)
    console.log("step in register: ", this.props.step)
    this.NOTSUBSCRIBERPlanRegistrationProcess = this.NOTSUBSCRIBERPlanRegistrationProcess.bind(this)
  }

  async NOTSUBSCRIBERPlanRegistrationProcess() {
    console.log("heyy")
    let flag, notification
    console.log("actuallly register the user", this.props.email, this.props.password, this.props.plan);
    ({flag, notification} = await this.handleRegistrationCall(this.props.email, this.props.password, this.props.plan))

    console.log(flag, notification)
    if (flag){
      this.setState({notification: notification})
      this.props.setStateStep(4)
    } else {
      this.setState({notification: notification})
    }
  }

  async handleRegistrationCall (_email, _password, _plan){
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
        plan: _plan,
      })
    })
   
    console.log(response)
    let data = await response.json()
    console.log(data)


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




  async asyncFunctionToreturnValidation(){
    console.log("Hello!!!!!!")
    let gen = this.handleValidation()
    let val = await gen.next() // Issue!
    console.log("Returned val on button click statements\nAfter let val = await gen.next()\n", val)
    return val
  }

  //generator function
  async *handleValidation(){
    // e.preventDefault()
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
        yield {yield_level: 2, number_of_max_yield_levels: 3, inProcessChecking: "password", message: notification}
        // yield to end process
      } else { // finish and return
        console.log("Hey component password good!");
        ({flag, notification} = await this.checkIfEmailDuplicateInDatabase(email))
        console.log("\n\nAfter API call, we are left with: ", flag, notification)
        if(!flag) {
          console.log("BAM!", notification)
          console.log("Hey component their is an issue on the server")
          this.setState({notification: notification})
          yield {yield_level: 3, number_of_max_yield_levels: 4, inProcessChecking: "password", message: notification}
        } else {
          // this.setState({notification: notification})
          console.log("success")
          return {yield_level: 4, number_of_max_yield_levels: 4, inProcessChecking: "POST /check/register endpoint", message: notification}
        }
      }
    }
  }

  async checkIfEmailDuplicateInDatabase (_email){
    console.log("Making API call!")
    let response
    let data

    response = await fetch(`${process.env.ROOT}/check/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: _email,
      })
    })

    data = await response.json()
   
    console.log(response)
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



  render() {
    console.log(typeof this.state.notification)
    let notifyDisplays
    notifyDisplays = this.state.notification?.map((notification, index) => {
      return <div key={index}>{notification}</div>
    })

    console.log(notifyDisplays)
    
    return (
      // Template out this code
      <div id="container-log-reg">
        <form id="loginregister" className="form">
          <h3>Register React</h3>
          <label>Email</label>
          <input type="text" name="email" value={this.props.email} onChange={(e) => this.props.handleChange("email", e)}/>
          <label>Password</label>
          <input type="password" name="password" value={this.props.password} onChange={(e) => this.props.handleChange("password", e)}/> 
          <button 
          onClick={
            async (e) => {
              e.preventDefault()
              let returnedValue = await this.asyncFunctionToreturnValidation()
              // console.log("work with this!", this.props.plan)
              if (returnedValue.value.yield_level == 4){
                // this.props.nextStep()
                if(this.props.plan == "NOTSUBSCRIBER") {
                  await this.NOTSUBSCRIBERPlanRegistrationProcess()
                }
                if(this.props.plan == "BASIC") {
                  this.props.nextStep()
                }
              } else {
                console.log("arrived until: ", returnedValue.value.yield_level)
              }
            }
          }>Register</button>
          
        </form>
        {/* display the notification from the server here! */}
        { notifyDisplays }
        <button onClick={(e) => this.props.setStateStep(1)}> Previous </button>
        {/* <button onClick={(e) => this.props.setStateStep('3')}> Next </button> */}
      </div>
    );
  }
}

export default Register