import '../style/reactDivMobile.css'
import './styles/Register.css'
import './styles/Register2.css'
import '../root-spas/styles/Sign-in-up.css'

import { verifyEmail, verifyPassword, verifyUsername, verifyTermsConditionsClicked } from '../../full-stack-libs/validations'
import RegisterButton from './RegisterButton4'
import RegisterNotification from './RegisterNotification'
// import LogRegFooter from './LogRegFooter'



// TODO !!! with the honey pot method send the data to the back end in order to circumvent the email sending. Same as you did with the contact page
// TODO !!! integrate GPTCopilot
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: [],
    }
    this.setNotification = this.setNotification.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.asyncFunctionToreturnValidation = this.asyncFunctionToreturnValidation.bind(this)

    this.honneyRef = React.createRef();
  }

  componentDidMount() {
    const body = document.body;
    body.classList.remove('unmounting-component');
    
    const previous = document.querySelector('div#pro-pre > button')
    previous.classList.add('dark-blue')

    const footerOnPage = document.getElementById('footer-on-page')
    footerOnPage.classList.add('transparent-bk')

  }

  componentWillUnmount() {
    const body = document.body;
    body.classList.add('unmounting-component');

    const previous = document.querySelector('div#pro-pre > button')
    previous.classList.remove('dark-blue')

    const footerOnPage = document.getElementById('footer-on-page')
    footerOnPage.classList.remove('transparent-bk')
  }



  async asyncFunctionToreturnValidation() {
    let gen = this.handleValidation()
    let val = await gen.next()
    console.log("asyncFunctionToreturnValidation()->val: ", val)
    return val
  }

  //generator function
  async *handleValidation() {

    const steps_number = 5

    const hny_spm = document.getElementById("loginregister").elements["hny_spm"].value
    const username = document.getElementById("loginregister").elements[0].value
    const email = document.getElementById("loginregister").elements[1].value
    const password = document.getElementById("loginregister").elements[2].value

    let flag, notification = [];

    ({ flag, notification } = verifyUsername(username))

    if (!flag) {
      this.setState({ notification: notification })
      yield { status: "failed", yield_level: 1 / steps_number, broke_and_caughtOnChecking: "username", message: notification }
    }

    ({ flag, notification } = verifyEmail(email))

    if (!flag) {
      this.setState({ notification: notification })
      yield { status: "failed", yield_level: 2 / steps_number, broke_and_caughtOnChecking: "email", message: notification }
    }

    // EMAIL GOOD
    ({ flag, notification } = verifyPassword(password))

    if (!flag) {
      this.setState({ notification: notification })
      yield { status: "failed", yield_level: 3 / steps_number, broke_and_caughtOnChecking: "password", message: notification }
    }



    // TERMS READ
    const checkbox_input_id = 'terms-conditions-checkbox-id';
    ({ flag, notification } = verifyTermsConditionsClicked(checkbox_input_id))

    if (!flag) {
      this.setState({ notification: notification })
      yield { status: "failed", yield_level: 4 / steps_number, broke_and_caughtOnChecking: "terms", message: notification }
    }


    // PASSWORD GOOD
    if (hny_spm === "") {
      ({ flag, notification } = await this.checkIfEmailDuplicateInDatabase(email, username))
    }

    if (!flag) {
      this.setState({ notification: notification })
      yield { status: "failed", yield_level: 5 / steps_number, broke_and_caughtOnChecking: "checking email, or, and username duplicates", message: notification }
    }

    // NO EMAIL DUPLICATE
    this.setState({ notification: [] })
    return { status: "success", yield_level: 5 / steps_number, broke_and_caughtOnChecking: null, message: notification }
  }






  setNotification(notification) {
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

            <input type="text" name="username" value={this.props.username} onChange={(e) => this.props.handleChange("username", e)} placeholder="Enter your username" />

            <label>Email</label>

            <input type="text" name="email" value={this.props.email} onChange={(e) => this.props.handleChange("email", e)} placeholder="Enter your email" />

            <label>Password</label>

            <input type="password" name="password" value={this.props.password} onChange={(e) => this.props.handleChange("password", e)} placeholder="Enter your password" />

            <label>
              I read and accept the <a target="_blank" href="/terms-conditions">terms and conditions.</a>
            </label>
            <input id='terms-conditions-checkbox-id' type="checkbox" />

            <input ref={this.honneyRef} type="text" name="hny_spm"/>

            <RegisterNotification
              notification={this.state.notification}
            />


          </form>

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
            honneyRef={this.honneyRef.current}
          />



          <div id='more-log-reg'>
            <p>Already have an account?   </p>
            <a href="/users/login">SIGN IN</a>
          </div>


        </div>

        <div id='pro-pre'>
          <img src="/img/SVG/sub/previous.svg" alt="" />
          <button onClick={(e) => this.props.setStateStep(2)}> Previous </button>
        </div>


        {/* <LogRegFooter /> */}




      </React.Fragment>
    );
  }
  // ___________________________________________________

  async checkIfEmailDuplicateInDatabase(_email, _username) {
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
          notification: typeof data.error.message === 'string' ? [data.error.message] : data.error.message
        }
      default:
        break;
    }
  }
}

export default Register