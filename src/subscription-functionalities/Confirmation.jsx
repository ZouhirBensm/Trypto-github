

class Confirmation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    // this.functionn=this.functionn.bind(this)
  }

  

  render(){
    return (
      <div className="confirmation-wrapper">
        <h1>Confirmation Component</h1>
        <button onClick={(e) => {
            console.log("what plan: ", this.props.plan)
            if(this.props.plan == "free") this.props.setStateStep(3)
            if(this.props.plan == "basic") this.props.previousStep(e)
          }}> Previous </button>
      </div>
    )
  }
}



export default Confirmation




