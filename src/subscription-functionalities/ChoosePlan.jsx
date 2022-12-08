

class ChoosePlan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      plan: this.props.plan || ""
    }
    this.proceed=this.proceed.bind(this)
    this.select=this.select.bind(this)
  }


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
        <button style={{ backgroundColor: this.state.plan == "NOTSUBSCRIBER"? 'red': ""}} onClick={(e) => this.select(e)} value="NOTSUBSCRIBER">NOTSUBSCRIBER Free</button>
        <button style={{ backgroundColor: this.state.plan == "BASIC"? 'red': ""}} onClick={(e) => this.select(e)} value="BASIC">BASIC 5$/month</button>
        {/* <button onClick={(e) => this.props.nextStep(e)}>Next!</button> */}
        <button onClick={(e) => this.proceed(e)} value={this.state.plan}>Proceed</button>
      </div>
    )
  }
}

export default ChoosePlan