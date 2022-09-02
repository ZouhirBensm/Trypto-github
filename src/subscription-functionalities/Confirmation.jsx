

class Confirmation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    // this.functionn=this.functionn.bind(this)
  }

  

  render(){
    let msg
    this.props.plan == "NOTSUBSCRIBER"? msg = "users": null
    this.props.plan == "BASIC"? msg = "subscribers": null

    return (
      <div className="confirmation-wrapper">
        <h1>Registration Done!</h1>

        <p>Congrats {this.props.email}, you have successfully registered as one of our {msg}</p>
        {/* <button onClick={(e) => {
            console.log("what plan: ", this.props.plan)
            if(this.props.plan == "NOTSUBSCRIBER") this.props.setStateStep(3)
            if(this.props.plan == "BASIC") this.props.previousStep(e)
          }}> Previous </button> */}
        <button onClick={(e) => {
          window.location.href = `${domain}/users/login`
        }}> Go to login page </button>
      </div>
    )
  }
}



export default Confirmation




