
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
        <button onClick={(e) => this.props.previousStep(e)}>Previous!</button>
      </div>
    )
  }
}

export default CardInfoSubmission