import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './style/reactDivMobile.css'
import utils from "../full-stack-libs/utils"

import loadable from "@loadable/component";
import Loading from "./generic-components/Loading"

import SubscAlter from "./subscription-functionalities/SubscAlter"
import { PureComponent } from "react";

// import Register from "./login-register-functionalities/Register"
// import ChoosePlan from "./subscription-functionalities/ChoosePlan"
// import CardInfoSubmission from "./subscription-functionalities/CardInfoSubmission"

const Register = loadable(() => import("./login-register-functionalities/Register"),{
  fallback: <Loading/>
});
const ChoosePlan = loadable(() => import("./subscription-functionalities/ChoosePlan"),{
  fallback: <Loading/>
});
const CardInfoSubmission = loadable(() => import("./subscription-functionalities/CardInfoSubmission"),{
  fallback: <Loading/>
});


class Subscription extends React.Component {
  constructor(){
    super()
    let step = utils.parseFullPath4lastpath(window.location)
    console.log("constructor Subscription: step: ", step)
    this.state = {
      step: step,
      email: "",
      password: "",
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
    // window.history.replaceState(null, null, `${domain}/subscription/${this.state.step}`)
    // window.location.href= `${domain}/subscription/${++this.state.step}`
  }
  previousStep(e){
    console.log("parent!")
    this.setState({
      step: --this.state.step
    })
    // window.location.href= `${domain}/subscription/${--this.state.step}`
  }

  // TODO get rid of this and buffer the data on the server https://www.digitalocean.com/community/tutorials/using-buffers-in-node-js when the rest is submitted save all to DB, if nothin is submitted (keep track of the process on the front end and know in node when we exited) delete the buffer
  handleChange(input, e){
    console.log("in parent", e.target.value)
    this.setState({
      [input]: e.target.value
    })
  }


  render() {
    let path = `/subscription/${this.state.step}`
    console.log("path: ", path)
    console.log("state: ", this.state)
    let component
    
    switch (path) {
      case `/subscription/1`:
        component = <ChoosePlan setStateStep={this.setStateStep} step={this.state.step} nextStep={this.nextStep}/>
        break;
      case `/subscription/2`:
        component = <Register setStateStep={this.setStateStep} email={this.state.email} password={this.state.password} step={this.state.step} previousStep={this.previousStep} nextStep={this.nextStep} handleChange={this.handleChange}/>
        break;
      case `/subscription/3`:
        component = <CardInfoSubmission setStateStep={this.setStateStep} step={this.state.step} previousStep={this.previousStep}/>
        break;
    
      default:
        component = null
        break;
    }
    return (
      // <div>Subscriptions</div>
      <React.Fragment>
        <a href="/subscription/1"> Restart </a>
        {/* <button onClick={(e) => {this.setStateStep('1')}}> Step1 </button>
        <button onClick={(e) => {this.setStateStep('2')}}> Step2 </button>
        <button onClick={(e) => {this.setStateStep('3')}}> Step3 </button> */}

        {component}
      </React.Fragment>
    )
  }
}

const element = <Subscription />;

ReactDOM.render(element, document.getElementById('react-div'));

