import '../style/reactDivMobile.css'
import './styles/Register.css'
import './styles/Register2.css'

import {verifyEmail, verifyPassword, verifyUsername} from '../../full-stack-libs/validations'
import RegisterButton from './RegisterButton'
import RegisterNotification from './RegisterNotification'

class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      notification: [],
    }
    this.setNotification = this.setNotification.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.asyncFunctionToreturnValidation = this.asyncFunctionToreturnValidation.bind(this)
  }

  async asyncFunctionToreturnValidation(){
    let gen = this.handleValidation()
    let val = await gen.next()
    console.log("asyncFunctionToreturnValidation()->val: ", val)
    return val
  }

  //generator function
  async *handleValidation() {

    const hny_spm = document.getElementById("loginregister").elements["hny_spm"].value
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
    if (hny_spm == "") {
      ({flag, notification} = await this.checkIfEmailDuplicateInDatabase(email, username))
    }
    
    if(!flag) {
      this.setState({notification: notification})
      yield {status: "failed", yield_level: 4/4, broke_and_caughtOnChecking: "checking email, or, and username duplicates", message: notification}
    }

    // NO EMAIL DUPLICATE
    this.setState({notification: []})
    return {status: "success", yield_level: 4/4, broke_and_caughtOnChecking: null, message: notification}
  }

  setNotification(notification){
    this.setState({
      notification: notification
    })
  }

  render() {
    return (
      <React.Fragment>
        <div id="container-log-reg">

          <form id="loginregister" className="form">

            <h3>Sign up</h3>

            <label>Username</label>

            <input type="text" name="username" value={this.props.username} onChange={(e) => this.props.handleChange("username", e)} placeholder="Zouhir"/>

            <label>Email</label>

            <input type="text" name="email" value={this.props.email} onChange={(e) => this.props.handleChange("email", e)} placeholder="z@example.com"/>

            <label>Password</label>

            <input type="text" name="password" value={this.props.password} onChange={(e) => this.props.handleChange("password", e)} placeholder="Zouhir123!"/>

            <input type="text" name="hny_spm"/>

            <RegisterButton
              asyncFunctionToreturnValidation={this.asyncFunctionToreturnValidation}
              setNotification={this.setNotification}
              setStateStep={this.props.setStateStep}
              nextStep={this.props.nextStep}
              username={this.props.username}
              plan={this.props.plan}
              email={this.props.email}
              lat={this.props.lat}
              lng={this.props.lng}
              password={this.props.password}
            />
            
          </form>

          <RegisterNotification
            notification={this.state.notification}
          />
          
          <button onClick={(e) => this.props.setStateStep(2)}> Previous </button>

        </div>
      </React.Fragment>
    );
  }
  // ___________________________________________________

  async checkIfEmailDuplicateInDatabase (_email, _username){
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
   
    switch (response.status) {
      case 200:
        return {
          flag: true,
          notification: data.server.message
        }
      case 500:
        return {
          flag: false,
          notification: typeof data.error.message === 'string'? [data.error.message]: data.error.message
        }
      default:
        break;
    }
  }
}

export default Register