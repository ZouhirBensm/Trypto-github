
import React from 'react'
import '../style/reactDivMobile.css'

class PasswordResetComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e = null){
    e?.preventDefault()
    console.log("Requesting a password reset!!")
  }

  render(){
    return (
      <React.Fragment>
        <div id="container-reset-pass">
        <form id="newpass" className="form">
          <h3>PasswordResetComponent</h3>

          <label>New password</label>
          <input type="password" name="password"/> <br/>
          <label>Confirm new password</label>
          <input type="password" name="password-check"/> <br/>
          <button type="submit" onClick={(e) => {
            this.handleSubmit(e);
          }}>Submit</button>
        </form>


      </div>
      </React.Fragment>
    )
  }
}

export default PasswordResetComponent