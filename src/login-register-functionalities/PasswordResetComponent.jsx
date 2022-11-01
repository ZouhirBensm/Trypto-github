
import React from 'react'
import '../style/reactDivMobile.css'
import {verifyPassword, validateInputs, arePasswordsEqual} from '../../full-stack-libs/validations'

class PasswordResetComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={
      notification: undefined,
      passwordinputbox1: false,
      passwordinputbox2: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.totalvalidationprocess = this.totalvalidationprocess.bind(this)
  }


  async handleSubmit(e = null){
    e?.preventDefault()
    console.log("Requesting a password reset!!")

    let password = document.getElementById("newpass").elements[0].value
    let password_check = document.getElementById("newpass").elements[1].value

    let [validation_notifs, boxalertmode] = this.totalvalidationprocess(password, password_check)
    // let [validation_notifs_and_boxalertmode] = this.totalvalidationprocess(password, password_check)

    console.log("---->>>>>", validation_notifs)

    this.setState({
      notification: validation_notifs,
      passwordinputbox1: boxalertmode[0],
      passwordinputbox2: boxalertmode[1],
    })

    if(validation_notifs){
      return
    }

    let hex_token = paths_URL[2]
    // pull in hex
    console.log("FETCH", password, hex_token)
    // return

    let response = await fetch(`/users/submission-new-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        newpassword: password,
        hex: hex_token
      })
    })

    let data = await response.json()

    console.log(response, data)

    let notif = undefined
    
    if (response.status == 200) {
      console.log("HITTTTT")
      window.location.href = `/users/login?popup=${data.message}`
    } else {
      notif = data.message
    }

    return this.setState({
      notification: notif,
    })

  }

  totalvalidationprocess(_password, _password_check){
    let passwords_obj = {_password, _password_check}
    console.log(passwords_obj)



    let verifyPasswordRet = verifyPassword(_password)
    
    console.log({verifyPasswordRet})

    let msg = undefined
    if(!verifyPasswordRet.flag) {
      // TODO rename verifyPasswordRet.notification to verifyPasswordRet.notifications
      msg = verifyPasswordRet.notification.map((element_notif, i)=>{
        return <React.Fragment key={i}><span>{element_notif}</span><br/></React.Fragment>
      }) 

      return [msg, [true, false]]
    }

    let verifyCheckPasswordRet = verifyPassword(_password_check)
    console.log({verifyCheckPasswordRet})

    if(!verifyCheckPasswordRet.flag) {
      // TODO rename verifyCheckPasswordRet.notification to verifyCheckPasswordRet.notifications
      msg = verifyCheckPasswordRet.notification.map((element_notif, i)=>{
        return <React.Fragment key={i}><span>{element_notif}</span><br/></React.Fragment>
      })
      return [msg, [false, true]]
    }
    

    let arePasswordsEqualRet = arePasswordsEqual(passwords_obj)
    console.log({arePasswordsEqualRet})
    
    if(arePasswordsEqualRet) {
      msg = <span>{arePasswordsEqualRet}</span>;
      return [msg, [true, true]]
    }

    console.log([msg, [false, false]])
    return [msg, [false, false]]
  }

  render(){
    return (
      <React.Fragment>
        <div id="container-reset-pass">
        <form id="newpass" className="form">
          <h3>PasswordResetComponent</h3>

          <label>New password</label>
          <input  style={{ border: this.state.passwordinputbox1 == true? '2px solid red':'none' }} type="text" name="password"/> <br/>
          <label>Confirm new password</label>
          <input  style={{ border: this.state.passwordinputbox2 == true? '2px solid red':'none'}} type="text" name="password-check"/> <br/>
          <button type="submit" onClick={async (e) => {
            let handleSubmitRet
            try {
              handleSubmitRet = await this.handleSubmit(e);
            } catch (error) {
              console.error("---->>ERROR", error)
            }
            console.log("Click buttin Callback", handleSubmitRet)
          }}>Submit</button>
        </form>
        <div>{this.state.notification}</div>

      </div>
      </React.Fragment>
    )
  }
}

export default PasswordResetComponent