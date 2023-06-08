import '../style/reactDivMobile.css'
import '../root-spas/styles/Sign-in-up.css'
import './styles/Login.css'
// import LogRegFooter from './LogRegFooter'
import { verifyEmail, validateInputs } from '../../full-stack-libs/validations'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      notification: popup,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateInputs = this.validateInputs.bind(this)
    // console.log(this.props.loginTo)
  }

  validateInputs(creds) {
    let flag = true, notification;
    ({ flag, notification } = verifyEmail(creds.email));
    console.log(flag, notification)

    if (!flag) {
      return this.setState({
        notification: notification[0]
      })
    }

    let err_msg
    err_msg = validateInputs(creds);

    if (err_msg) {
      flag = false
      return this.setState({
        notification: err_msg
      })
    }

    console.log({ flag })
    return flag

  }


  async handleSubmit(e) {
    e.preventDefault()

    let email = document.getElementById("loginregister").elements[0].value
    let password = document.getElementById("loginregister").elements[1].value


    let validated = this.validateInputs({ email, password })
    console.log({ validated })
    if (!validated) return


    // TODO when registering need two inputs for the password (or not)
    // TODO in the forgot password process the app does not check that the newpassword is equal to the old one. This should be checked on the back end, and respond with an error "New Password cannot be set to the old one!"

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
    } else if (response.status == 403) {
      // Resends email
      let response = await fetch(`/resend-user-email/${email}`, {
        method: 'GET',
      })
      console.log("email response", response)

      this.setState({
        notification: data.error.message,
      })


    } else {
      this.setState({
        notification: data.error.message,
      })
    }

    return response.status
  }

  // throw new Error(`Front end does not support failed POST ${this.props.loginTo} server response`)




  render() {


    // console.log("caught2---->", this.state.notification)
    // const notifyDisplays = <div dangerouslySetInnerHTML={{ __html:  this.state.notification}}></div>

    const notifyDisplays = <p className='popup'> {this.state.notification} </p>
    // console.log(notifyDisplays)

    return (
      <React.Fragment>

        <div id="container-log-reg">

          <form id="loginregister" className="form">

            <h3>Sign in</h3>

            <p>Sign in into your account</p>

            <label>Email</label>
            <input type="text" name="email" placeholder='Your email' />

            <div id='label'>
              <label>Password</label>
              <a href="/users/forgotpasswordpage">Forgot Password</a>
            </div>

            <input type="password" name="password" placeholder='Your password' />


            {notifyDisplays}



          </form>

          <button type="submit" onClick={async (e) => {
            let statusCode = await this.handleSubmit(e)
            console.log(statusCode)
          }}>CONTINUE</button>


          <div id='more-log-reg'>
            <p>Don't have an account?   </p>
            <a href="/subscription">SIGN UP</a>
          </div>

        </div>

        {/* <LogRegFooter /> */}

      </React.Fragment>
    );
  }
}

export default Login