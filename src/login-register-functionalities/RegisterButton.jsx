import { generate_fake_subscription_ID } from '../../full-stack-libs/utils'
import ROLE from '../../full-stack-libs/Types/Role'

class RegisterButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.NOTSUBSCRIBERPlanRegistrationProcess = this.NOTSUBSCRIBERPlanRegistrationProcess.bind(this)
    this.handleRegistrationCall = this.handleRegistrationCall.bind(this)
  }

  componentDidMount() {
    var registerButton = document.getElementById("register-button")
    registerButton.disabled = true
    const rand_delta = Number((Math.random() * 100).toFixed(2))
    const fake_delay = 1000 + rand_delta

    setTimeout(() => {
      registerButton.disabled = false
    }, fake_delay)
  }




  async planRegistrationFunction(returnedValue1) {

    const hny_spm = document.getElementById("loginregister").elements["hny_spm"].value

    if (hny_spm != "") {
      let fake_success_message
      if (this.props.plan == ROLE.USER.SUBSCRIBER.BASIC) {
        const fake_paypal_subscriptionID = generate_fake_subscription_ID();
        fake_success_message = `Subscriber ${this.props.username} successfully created, with the paypal subscriber ID: ${fake_paypal_subscriptionID}`
      } else {
        fake_success_message = `User ${this.props.username} successfully created`
      }

      const rand_delta = Number((Math.random() * 100).toFixed(2))
      const fake_api_delay = 900 + rand_delta

      setTimeout(() => {
        this.props.setNotification([fake_success_message])
        this.props.setStateStep(5)
        return
      }, fake_api_delay)
      return
    }
    if (returnedValue1.value.status != "success") {
      return
    }

    switch (this.props.plan) {
      case "NOTSUBSCRIBER":
        await this.NOTSUBSCRIBERPlanRegistrationProcess()
        break;
      case "BASIC":
        this.props.nextStep()
        break;
      default:
        console.error("Plan not reconized")
        break;
    }
    return
  }

  render() {
    return (
      <React.Fragment>
        <button id='register-button' onClick={async (e) => {
          e.preventDefault()
          let returnedValue1 = await this.props.asyncFunctionToreturnValidation()
          await this.planRegistrationFunction(returnedValue1)
          return
        }}>Register</button>
      </React.Fragment>
    )
  }

  async NOTSUBSCRIBERPlanRegistrationProcess() {
    let flag, notification

    ({ flag, notification } = await this.handleRegistrationCall(this.props.username, this.props.email, this.props.password, this.props.plan, this.props.lat, this.props.lng))

    if (flag) {
      this.props.setNotification(notification)
      this.props.setStateStep(5)
    } else {
      this.props.setNotification(notification)
    }
    return
  }

  async handleRegistrationCall(_username, _email, _password, _plan, _lat, _lng) {

    const response = await fetch(`/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: _username,
        email: _email,
        password: _password,
        plan: _plan,
        lat: _lat,
        lng: _lng,
      })
    })

    let data = await response.json()

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

export default RegisterButton