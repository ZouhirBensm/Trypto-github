
import React from 'react'
import '../style/reactDivMobile.css'
import {verifyPassword, validateInputs, arePasswordsEqual} from '../../full-stack-libs/validations'

class PasswordResetComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={
      notification: undefined,
      inputboxred1: false,
      inputboxred2: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.totalvalidationprocess = this.totalvalidationprocess.bind(this)
  }


  async handleSubmit(e = null){
    e?.preventDefault()
    console.log("Requesting a password reset!!")

    let password = document.getElementById("newpass").elements[0].value
    let password_check = document.getElementById("newpass").elements[1].value

    let watup = this.totalvalidationprocess(password, password_check)

    console.log("---->>>>>", watup)

    this.setState({
      notification: watup[0],
      inputboxred1: watup[1][0],
      inputboxred2: watup[1][1],
    })

    if(watup[0]){
      return
    }

    // console.log("FETCH", password, hash_of_user_to_reset_password)

    let response = await fetch(`/users/submission-new-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        newpassword: password,
        hash: hash_of_user_to_reset_password
      })
    })

    let data = await response.json()

    console.log(response, data)

    let not = undefined
    
    if (response.status == 200) {
      window.location.href = `/users/login?popup=${data.message}`
    } else {
      not = data.message
    }

    return this.setState({
      notification: not,
    })

  }

  totalvalidationprocess(_password, _password_check){
    let obj = {_password, _password_check}
    console.log(obj)



    let returned2 = verifyPassword(_password)
    
    console.log({returned2})

    let msg = undefined
    if(!returned2.flag) {
      msg = returned2.notification.map((element, i)=>{
        return <React.Fragment key={i}><span>{element}</span><br/></React.Fragment>
      }) 

      return [msg, [true, false]]
    }

    let returned4 = verifyPassword(_password_check)
    console.log({returned4})

    if(!returned4.flag) {
      msg = returned4.notification.map((element, i)=>{
        return <React.Fragment key={i}><span>{element}</span><br/></React.Fragment>
      })
      return [msg, [false, true]]
    }
    

    let returned3 = arePasswordsEqual(obj)
    console.log({returned3})
    if(returned3) return [returned3, [true, true]]


    return [msg, [false, false]]
  }

  render(){
    return (
      <React.Fragment>
        <div id="container-reset-pass">
        <form id="newpass" className="form">
          <h3>PasswordResetComponent</h3>

          <label>New password</label>
          <input  style={{ border: this.state.inputboxred1 == true? '2px solid red':'none' }} type="text" name="password"/> <br/>
          <label>Confirm new password</label>
          <input  style={{ border: this.state.inputboxred2 == true? '2px solid red':'none'}} type="text" name="password-check"/> <br/>
          <button type="submit" onClick={async (e) => {
            let ok = await this.handleSubmit(e);
            console.log("Hello end", ok)
          }}>Submit</button>
        </form>
        <div>{this.state.notification}</div>

      </div>
      </React.Fragment>
    )
  }
}

export default PasswordResetComponent