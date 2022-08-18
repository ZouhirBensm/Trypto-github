
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
class ChoosePlan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    // this.functionn=this.functionn.bind(this)
  }
  // functionn(e){
  //   console.log("child!")
  //   window.location.href= 'http://localhost:3000/subscription/2'
  // }

  render(){
    return (
      <div>
        <h1>ChoosePlan</h1>
        {/* <button onClick={(e) => this.props.nextStep(e)}>Next!</button> */}
        <Link to="/subscription/2" onClick={(e) => this.props.nextStep(e)}> Next </Link>
      </div>
    )
  }
}

export default ChoosePlan