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
    console.log("step in register: ", this.props.step)
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
        // set the state of the notification to tell component "Good password"
        console.log("Hey component password good!");
        // this.setState({notification: notification})
        return {yield_level: 2, number_of_max_yield_levels: 3, inProcessChecking: "nothing", message: notification}
      }
    }
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
          <input type="text" name="email" value={this.props.email} onChange={(e) => this.props.handleChange("email", e)}/>
          <label>Password</label>
          <input type="password" name="password" value={this.props.password} onChange={(e) => this.props.handleChange("password", e)}/> 
          {"step: " + this.props.step}
          <a href="/subscription/3" 
          onClick={
            async (e) => {
              e.preventDefault()
              let returnedValue = await this.asyncFunctionToreturnValidation()
              if (returnedValue.done){
                this.props.nextStep()
              }
            }
          }>Register</a>
          
        </form>
        {/* display the notification from the server here! */}
        { notifyDisplays }
        <button onClick={(e) => this.props.setStateStep('1')}> Previous </button>
        <button onClick={(e) => this.props.setStateStep('3')}> Next </button>
      </div>
    );
  }
}

export default Register