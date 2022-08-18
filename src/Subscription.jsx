import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './style/reactDivMobile.css'
import utils from "../full-stack-libs/utils"

import loadable from "@loadable/component";
import Loading from "./generic-components/Loading"

import SubscAlter from "./subscription-functionalities/SubscAlter"

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
    this.setStepFunction = this.setStepFunction.bind(this)
    this.nextStep=this.nextStep.bind(this)
    this.previousStep=this.previousStep.bind(this)
    this.handleChange=this.handleChange.bind(this)
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
    // this.setState({
    //   step: --this.state.step
    // })
    window.location.href= `${domain}/subscription/${--this.state.step}`
  }

  setStepFunction(stepp, e){
    console.log("setStepFunction: stepp:", stepp)
    this.setState({ step: stepp }); 
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
    
    return (
      // <div>Subscriptions</div>
      <Router>
        <Switch>
          
          <Route exact path={path}>
            <Link to="/subscription/1" onClick={(e) => this.setStepFunction('1',e)}> Step1 </Link>
            <Link to="/subscription/2" onClick={(e) => this.setStepFunction('2',e)}> Step2 </Link>
            <Link to="/subscription/3" onClick={(e) => this.setStepFunction('3',e)}> Step3 </Link>
            <br/>
            <br/>
            {"step: " + this.state.step}

            {/* <Route path="/subscription/:step" render={
              (props) => <SubscAlter {...props} step={this.state.step}/>
            }/> */}

            <Route path="/subscription/1" render={
              (props) => <ChoosePlan {...props} step={this.state.step} nextStep={this.nextStep}/>
            }/>
            <Route path="/subscription/2" render={
              (props) => <Register {...props} step={this.state.step} previousStep={this.previousStep} nextStep={this.nextStep} handleChange={this.handleChange}/>
            }/>
            <Route path="/subscription/3" render={
              (props) => <CardInfoSubmission {...props} step={this.state.step} previousStep={this.previousStep}/>
            }/>

          </Route>

        </Switch>
      </Router>
    )
  }
}

const element = <Subscription />;

ReactDOM.render(element, document.getElementById('react-div'));

