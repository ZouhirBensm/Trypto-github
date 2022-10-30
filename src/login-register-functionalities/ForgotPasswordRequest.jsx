
import React from 'react'
import '../style/reactDivMobile.css'
import {verifyEmail, validateInputs} from '../../full-stack-libs/validations'



class ForgotPasswordRequest extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      notification: undefined,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.totalvalidationprocess = this.totalvalidationprocess.bind(this)
  }

  

  async handleSubmit(e = null){
    e?.preventDefault()
    console.log("Reset password!!!")
    let email = document.getElementById("forgotpass").elements[0].value


    let watup = this.totalvalidationprocess(email)

    this.setState({
      notification: watup
    })

    console.log("---->>>>>", watup)
    if(watup){
      return
    }


    console.log("FETCH")

    let response = await fetch(`/users/requestresetpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
      })
    })

    let data = await response.json()

    console.log(response, data)

    let not = undefined
    
    if (response.status == 200) {
      not = data.message
    } else {
      not = "Not 200 in the response status"
    }

    return this.setState({
      notification: not,
    })
  
  }

  totalvalidationprocess(_email){
    let obj = {_email}
    console.log(obj)


    let returned2 = verifyEmail(_email)
    console.log({returned2})
    if(!returned2.flag) return returned2.notification


    let returned = validateInputs(obj)
    console.log({returned})
    if(returned) return returned

    return undefined
  }




  render(){
    return (
      <React.Fragment>
        <div id="container-forgotpass">
        <form id="forgotpass" className="form">
          <h3>ForgotPassword...</h3>
          <label>Enter Email to Reset</label>
          <input type="text" name="email"/> 
          <button type="submit" onClick={ async (e) => {
            let ok = await this.handleSubmit(e);
            console.log("Hello end", ok)
            
            }}>Reset</button>
          <div>{this.state.notification}</div>
        </form>
        


      </div>
      </React.Fragment>
    )
  }
}

export default ForgotPasswordRequest