// import React from 'react';
import './styles/MgtUser.css' 
import {verifyEmail, validateInputs} from '../../full-stack-libs/validations'

class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      // notification: '',
      notification: popup,
    }
    // this.functionneed = this.functionneed.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateInputs = this.validateInputs.bind(this)
    // this.popup = null
    console.log(this.props.loginTo)
    // this.functionneed()
  }

  validateInputs(creds){
    let flag = true, notification;
    ({flag,notification} = verifyEmail(creds.email));
    console.log(flag, notification)

    if(!flag) {
      return this.setState({
        notification: notification[0]
      })  
    }

    let err_msg
    err_msg = validateInputs(creds);

    if(err_msg) {
      flag = false
      return this.setState({
        notification: err_msg
      })  
    }

    console.log({flag})
    return flag

  }

  // validateInputs(_marketOrderBasicData, _marketOrderTradeLocationSpecifics) {
  //   // console.log("validating inputs", _marketOrderBasicData)

  //   let error_msg_retrieved_if_any
  //   error_msg_retrieved_if_any = validateOrderInputs(_marketOrderBasicData, error_msg_retrieved_if_any)
  //   error_msg_retrieved_if_any = validateInputs_marketOrderTradeLocationSpecifics(_marketOrderTradeLocationSpecifics, error_msg_retrieved_if_any)


  //   if (error_msg_retrieved_if_any) {
  //     this.setState({
  //       popup_state: error_msg_retrieved_if_any
  //     }, ()=>{
  //       console.log("scroll down")
  //       let container = document.getElementsByClassName("make-container")[0]
  //       console.log('container', container)
  //       container.scrollTo(0, container.scrollHeight);
  //     })
  //   } else { return true }

  // }
  
  // functionneed(){
  //   const params = new Proxy(new URLSearchParams(window.location.search), {
  //     get: (searchParams, prop) => searchParams.get(prop),
  //   });
  //   // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  //   let value = params.popup; // "some_value"
  //   console.log(value)
  //   this.popup = value
  // }

  async handleSubmit(e){
    e.preventDefault()

    let email = document.getElementById("loginregister").elements[0].value
    let password = document.getElementById("loginregister").elements[1].value


    let validated = this.validateInputs({email, password})
    console.log({validated})
    if (!validated) return


    // TODO when registering need two inputs for the password (or not)
    // TODO !! change password when forgotten process
    
    console.log("FETCH")

    let response = await fetch(`${this.props.loginTo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })

    let data = await response.json()

    console.log(response, data)


    if (response.status == 200) {
      window.location.href = `/?popup=You have successfully logged in!`;
    } else {
      if(data.error){
        this.setState({
          notification: data.error.message,
        })
      } else {
        throw new Error(`Front end does not support failed POST ${this.props.loginTo} server response`)
      }
    }
  }

  render() {

    // console.log(this.popup)
    const notifyDisplays = <div>{this.state.notification}</div>
  

    // console.log(notifyDisplays)
    
    return (
      <div id="container-log-reg">
        <form id="loginregister" className="form">
          <h3>Login</h3>
          <label>Email</label>
          <input type="text" name="email"/> 
          <label>Password</label>
          <input type="text" name="password"/> 
          <button type="submit" onClick={(e) => this.handleSubmit(e)}>Login</button>
        </form>
        {/* display the notification from the server here! */}
        { notifyDisplays }

        {/* {this.popup?
        <p>{this.popup}</p>
        :null} */}

      </div>
    );
  }
}

export default Login