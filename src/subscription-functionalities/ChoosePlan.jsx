
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
class ChoosePlan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      plan: this.props.plan || ""
    }
    this.proceed=this.proceed.bind(this)
    this.select=this.select.bind(this)
  }
  // functionn(e){
  //   console.log("child!")
  //   window.location.href= 'http://localhost:3000/subscription/2'
  // }

  select(e){
    console.log("in select")
    console.log(e.target.value)
    if(!this.state.plan || this.state.plan != e.target.value){
      this.setState({
        plan: e.target.value
      })
    } else {
      this.setState({
        plan: ""
      })
    }
  }

  proceed(e){
    e.preventDefault()
    console.log("in proceed")
    console.log(this.state.plan)
    if(this.state.plan){
      this.props.handleChange("plan", e)
      this.props.nextStep()
    } else {
      console.log("Please select a plan before proceeding!")
    }
  }

  render(){
    return (
      <div>
        <h1>ChoosePlan</h1>
        <button style={{ backgroundColor: this.state.plan == "free"? 'red': ""}} onClick={(e) => this.select(e)} value="free">Free</button>
        <button style={{ backgroundColor: this.state.plan == "basic"? 'red': ""}} onClick={(e) => this.select(e)} value="basic">5$/month</button>
        {/* <button onClick={(e) => this.props.nextStep(e)}>Next!</button> */}
        <button onClick={(e) => this.proceed(e)} value={this.state.plan}>Proceed</button>
      </div>
    )
  }
}

export default ChoosePlan