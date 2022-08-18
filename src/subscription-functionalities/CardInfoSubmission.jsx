
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
class CardInfoSubmission extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    // this.functionn=this.functionn.bind(this)
  }

  render(){
    return (
      <div>
        <h1>CardInfoSubmission</h1>
        <Link to="/subscription/2" onClick={(e) => this.props.previousStep(e)}> Previous </Link>
      </div>
    )
  }
}

export default CardInfoSubmission