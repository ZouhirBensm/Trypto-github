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
    console.log(step)
    this.state = {
      step: step
    }
    this.setStepFunction = this.setStepFunction.bind(this)
  }

  setStepFunction(stepp, e){
    // e.preventDefault()
    console.log("hello")
    console.log(stepp)
    this.setState({ step: stepp }
      // , ()=>{
      // let path = `/subscription/${this.state.step}`
      // window.location.href= `${domain}${path}`
      // }
    ); 
  }


  render() {
    let path = `/subscription/${this.state.step}`
    console.log(path)
    return (
      // <div>Subscriptions</div>
      <Router>
        <Switch>
          
          <Route exact path={path}>
            <Link to="/subscription/step1" onClick={(e) => this.setStepFunction('step1',e)}> Step1 </Link>
            <Link to="/subscription/step2" onClick={(e) => this.setStepFunction('step2',e)}> Step2 </Link>
            <Link to="/subscription/step3" onClick={(e) => this.setStepFunction('step3',e)}> Step3 </Link>
            <br/>
            <br/>
            {this.state.step}

            {/* <Route path="/subscription/:step" render={
              (props) => <SubscAlter {...props} step={this.state.step}/>
            }/> */}

            <Route path="/subscription/step1" render={
              (props) => <Register {...props} step={this.state.step}/>
            }/>
            <Route path="/subscription/step2" render={
              (props) => <ChoosePlan {...props} step={this.state.step}/>
            }/>
            <Route path="/subscription/step3" render={
              (props) => <CardInfoSubmission {...props} step={this.state.step}/>
            }/>

          </Route>

        </Switch>
      </Router>
    )
  }
}

const element = <Subscription />;

ReactDOM.render(element, document.getElementById('react-div'));

