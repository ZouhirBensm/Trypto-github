
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
        <button onClick={(e) => this.props.setStateStep('2')}> Previous </button>
      </div>
    )
  }
}

export default CardInfoSubmission