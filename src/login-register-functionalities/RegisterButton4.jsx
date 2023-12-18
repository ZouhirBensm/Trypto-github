import { generate_fake_subscription_ID } from '../../full-stack-libs/utils'
import ROLE from '../../full-stack-libs/Types/Role'

class RegisterButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    this.NOTSUBSCRIBERPlanRegistrationProcess = this.NOTSUBSCRIBERPlanRegistrationProcess.bind(this)

    this.handleRegistrationCall = this.handleRegistrationCall.bind(this)
    this.fakeresponse = this.fakeresponse.bind(this)

    this.buttonRef = React.createRef();
  }
  
  componentDidMount() {
    
    this.buttonRef.current.disabled = true
    const rand_delta = Number((Math.random() * 100).toFixed(2))
    const fake_delay = 1500 + rand_delta

    setTimeout(() => {
      this.buttonRef.current.disabled = false
    }, fake_delay)
  }




  async planRegistrationFunction() {

    const Wrong_plan_msg = "Plan not reconized"


    console.log('honney???-->', this.props.honneyRef, this.props.honneyRef.value, this.props.honneyRef.value === "")
    
    // guard honney trap
    if (this.props.honneyRef.value !== "") {
      return this.fakeresponse()
    }


    switch (this.props.plan) {
      case ROLE.USER.NOTSUBSCRIBER:
        await this.NOTSUBSCRIBERPlanRegistrationProcess()
        break;
      case ROLE.USER.SUBSCRIBER.BASIC:
        this.setState({ loading: false });
        this.props.nextStep()
        break;
      default:
        console.error(Wrong_plan_msg)
        break;
    }

    return


  }

  render() {
    return (
      <React.Fragment>

        {this.state.loading ?
          <div className="spinner"></div> :
          <button ref={this.buttonRef} id='register-button' onClick={async (e) => {
            e.preventDefault()

            this.setState({ loading: true });

            let validationObject = await this.props.asyncFunctionToreturnValidation()

            if (validationObject.value.status !== "success") return this.setState({ loading: false });

            await this.planRegistrationFunction()

            return
          }}>Register</button>}



      </React.Fragment>
    )
  }

  async NOTSUBSCRIBERPlanRegistrationProcess() {
    let flag, notification

    ({ flag, notification } = await this.handleRegistrationCall(this.props.username, this.props.email, this.props.password, this.props.plan, this.props.lat, this.props.lng))

    if (flag) {
      this.setState({ loading: false });
      this.props.setNotification(notification)
      this.props.setStateStep(5)
    } else {
      this.setState({ loading: false });
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

  fakeresponse(){

    console.log("FAKE BS")
    let fake_success_message
    if (this.props.plan == ROLE.USER.SUBSCRIBER.BASIC) {
      const fake_paypal_subscriptionID = generate_fake_subscription_ID();
      fake_success_message = `Subscriber ${this.props.username} successfully created, with the paypal subscriber ID: ${fake_paypal_subscriptionID}`
    } else {
      fake_success_message = `User ${this.props.username} successfully created`
    }

    const rand_delta = Number((Math.random() * 100).toFixed(2))
    const fake_api_delay = 9000 + rand_delta

    setTimeout(() => {
      this.setState({ loading: false });
      this.props.setNotification([fake_success_message])
      this.props.setStateStep(5)
      return
    }, fake_api_delay)


    return

  }
}

export default RegisterButton