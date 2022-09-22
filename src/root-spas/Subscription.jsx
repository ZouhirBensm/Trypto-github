import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import '../style/reactDivMobile.css'
import utils from "../../full-stack-libs/utils"

import loadable from "@loadable/component";
import Loading from "../generic-components/Loading"


// import Register from "./login-register-functionalities/Register"
// import ChoosePlan from "./subscription-functionalities/ChoosePlan"
// import CardInfoSubmission from "./subscription-functionalities/CardInfoSubmission"

const Register = loadable(() => import("../login-register-functionalities/Register"),{
  fallback: <Loading/>
});
const ChoosePlan = loadable(() => import("../subscription-functionalities/ChoosePlan"),{
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
    // let step = utils.parseFullPath4lastpath(window.location)
    // console.log("constructor Subscription: step: ", step)
    this.state = {
      step: 1,
      email: "",
      password: "",
      plan: "",
    }
    this.nextStep=this.nextStep.bind(this)
    this.previousStep=this.previousStep.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.setStateStep=this.setStateStep.bind(this)
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


  render() {
    // let path = `/subscription/${this.state.step}`
    // console.log("path: ", path)
    console.log("state: ", this.state)
    let component
    
    switch (this.state.step) {
      case 1:
        component = <ChoosePlan handleChange={this.handleChange} setStateStep={this.setStateStep} step={this.state.step} plan={this.state.plan} nextStep={this.nextStep}/>
        break;
      case 2:
        component = <Register plan={this.state.plan} setStateStep={this.setStateStep} email={this.state.email} password={this.state.password} step={this.state.step} previousStep={this.previousStep} nextStep={this.nextStep} handleChange={this.handleChange}/>
        break;
      case 3:
        component = <CardInfoSubmission email={this.state.email} password={this.state.password} plan={this.state.plan} setStateStep={this.setStateStep} step={this.state.step} previousStep={this.previousStep} nextStep={this.nextStep}/>
        break;
      case 4:
        component = <Confirmation email={this.state.email} plan={this.state.plan} setStateStep={this.setStateStep} previousStep={this.previousStep}/>
        break;
    
      default:
        component = null
        break;
    }
    return (
      // <div>Subscriptions</div>
      <React.Fragment>
        {this.state.step != 4? <a href="/subscription"> Restart </a>: null}
        {/* <button onClick={(e) => {this.setStateStep('1')}}> Step1 </button>
        <button onClick={(e) => {this.setStateStep('2')}}> Step2 </button>
        <button onClick={(e) => {this.setStateStep('3')}}> Step3 </button> */}

        {component}
      </React.Fragment>
    )
  }
}


export default Subscription

const element = <Subscription />;

ReactDOM.render(element, document.getElementById('react-div'));

