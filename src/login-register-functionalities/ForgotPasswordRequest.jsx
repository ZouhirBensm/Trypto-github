
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


    let validation_notif = this.totalvalidationprocess(email)

    this.setState({
      notification: validation_notif
    })

    console.log("---->>>>>", validation_notif)
    if(validation_notif){
      return
    }


    console.log("FETCH")

    let response = await fetch(`/users/requestpasswordresetbyemail`, {
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

    let notif = undefined
    
    if (response.status == 200) {
      notif = data.message
    } else {
      notif = data.error.message
    }
    
    this.setState({
      notification: notif,
    })
    
    return data
    
  
  }

  totalvalidationprocess(_email){
    let email_obj = {_email}
    console.log(email_obj)


    let verifEmailRet = verifyEmail(_email)
    console.log({verifEmailRet})
    if(!verifEmailRet.flag) return verifEmailRet.notification


    let validateInputsRetMsg = validateInputs(email_obj)
    console.log({validateInputsRetMsg})
    if(validateInputsRetMsg) return validateInputsRetMsg

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
            let handleSubmitRet
            try {
              handleSubmitRet = await this.handleSubmit(e);
            } catch (error) {
              console.error("---->>ERROR", error)
            }
            console.log("Click buttin Callback", handleSubmitRet)
            }}>Reset</button>
          <div>{this.state.notification}</div>
        </form>
        


      </div>
      </React.Fragment>
    )
  }
}

export default ForgotPasswordRequest