import OnPageFooter from '../generic-components/OnPageFooter'
import './styles/ChoosePlan.css'

class ChoosePlan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      plan: this.props.plan || "",
      notification: undefined,
    }
    this.proceed=this.proceed.bind(this)
    this.select=this.select.bind(this)
  }


  select(e){
    console.log("in select")
    // console.log(e.target.value)
    console.log(e.currentTarget.value)
    if(!this.state.plan || this.state.plan != e.currentTarget.value){
      this.setState({
        plan: e.currentTarget.value,
        notification: undefined,
      })
    } else {
      this.setState({
        plan: "",
        notification: undefined,
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
      this.setState({
        notification: "Please select a plan before proceeding!"
      })
    }
  }

  render(){
    return (
      <React.Fragment>
        <div id='choose-plan'>
          <h1>Choose a Plan</h1>
          <div id='choose-plan-selector'>
            <button style={{ backgroundColor: this.state.plan == "NOTSUBSCRIBER"? '#0800ff': ""}} onClick={(e) => this.select(e)} value="NOTSUBSCRIBER">
              <h3>Free</h3>
              <div>
                <div>Able to post the items you sell</div>
                <div>Chat with other users to buy items they sell</div>
                <div>Enjoy a Bitcoin Satochi denominated marketplace</div>
                <div>Benefit from our upcomming features (newsletter, in app bitcoin transactions, and more)</div>
              </div>
            </button>
            <button style={{ backgroundColor: this.state.plan == "BASIC"? '#0800ff': ""}} onClick={(e) => this.select(e)} value="BASIC">
              <h3>Basic</h3>
              <span>5$ per month</span>
              <div>
                <div>All the above and,</div>
                <div>The items you post for sale get placed on top of the stack</div>
                <div>Priority for customer service</div>
                <div>Support our team</div>
              </div>
            </button>
          </div>
          
          <div id='proceed'>
            <button onClick={(e) => this.proceed(e)} value={this.state.plan}>Proceed</button>
            <img src="/img/SVG/sub/proceed.svg" alt=""/>
          </div>
          
          { this.state.notification ?
          <div id="notif">{this.state.notification}</div>
          : null }

        </div>

        <OnPageFooter/>
      </React.Fragment>
    )
  }
}

export default ChoosePlan