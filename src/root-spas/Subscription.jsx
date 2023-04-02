import '../style/reactDivMobile.css'
import './styles/Subscription.css'

import loadable from "@loadable/component";
import Loading from "../generic-components/Loading"



const ChoosePlan = loadable(() => import("../subscription-functionalities/ChoosePlan"),{
  fallback: <Loading/>
});
const Register = loadable(() => import("../login-register-functionalities/Register2"),{
  fallback: <Loading/>
});
const AssociatedLocation = loadable(() => import("../subscription-functionalities/AssociatedLocation"),{
  fallback: <Loading/>
});
const CardInfoSubmission = loadable(() => import("../subscription-functionalities/CardInfoSubmission"),{
  fallback: <Loading/>
});
const Confirmation = loadable(() => import("../subscription-functionalities/Confirmation"),{
  fallback: <Loading/>
});


class Subscription extends React.Component {
  constructor(){
    super()
    this.state = {
      step: 1,
      username: "",
      email: "",
      password: "",
      plan: "",
      lat: undefined,
      lng: undefined,
      // hny_spm: "",
    }
    this.nextStep=this.nextStep.bind(this)
    this.previousStep=this.previousStep.bind(this)
    this.setStateStep=this.setStateStep.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.setLocality=this.setLocality.bind(this)
  }

  setStateStep(step){
    this.setState({
      step: step
    })
  }
  nextStep(e){
    console.log("parent!")
    this.setState({
      step: ++this.state.step
    })
  }
  previousStep(e){
    console.log("parent!")
    this.setState({
      step: --this.state.step
    })
  }

  handleChange(input, e){
    console.log("in parent", e.target.value)
    this.setState({
      [input]: e.target.value
    })
  }

  setLocality(lat, lng, e){
    this.setState({
      lat: lat,
      lng: lng,
    })
  }


  render() {
    console.log("state: ", this.state)
    let component
    
    switch (this.state.step) {
      case 1:
        component = <ChoosePlan handleChange={this.handleChange} setStateStep={this.setStateStep} step={this.state.step} plan={this.state.plan} nextStep={this.nextStep}/>
        break;
      case 2:
        component = <AssociatedLocation setLocality={this.setLocality} setStateStep={this.setStateStep} step={this.state.step} nextStep={this.nextStep} lat={this.state.lat} lng={this.state.lng}/>
        break;
      case 3:
        component = <Register plan={this.state.plan} setStateStep={this.setStateStep} username={this.state.username} email={this.state.email} password={this.state.password} lat={this.state.lat} lng={this.state.lng} step={this.state.step} previousStep={this.previousStep} nextStep={this.nextStep} handleChange={this.handleChange}/>
        break;
      case 4:
        component = <CardInfoSubmission username={this.state.username} email={this.state.email} password={this.state.password} plan={this.state.plan} lat={this.state.lat} lng={this.state.lng} setStateStep={this.setStateStep} step={this.state.step} previousStep={this.previousStep} nextStep={this.nextStep}/>
        break;
      case 5:
        component = <Confirmation username={this.state.username} email={this.state.email} plan={this.state.plan} setStateStep={this.setStateStep} previousStep={this.previousStep}/>
        break;
    
      default:
        component = null
        break;
    }
    return (
      <React.Fragment>
        {this.state.step != 4? 
        <a id='reset' href="/subscription">
          <img src="/img/SVG/sub/reset.svg" alt="" />
          <span>Reset</span>
        </a>: null}
        
        {component}
      </React.Fragment>
    )
  }
}


export default Subscription

const element = <Subscription />;

ReactDOM.render(element, document.getElementById('react-div'));

