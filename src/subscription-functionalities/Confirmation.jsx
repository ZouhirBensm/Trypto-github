


class Confirmation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    // this.functionn=this.functionn.bind(this)
  }

  

  render(){

    console.log("ppppppp", bidblock_email)
    // let msg
    // this.props.plan == "NOTSUBSCRIBER"? msg = "user": null
    // this.props.plan == "BASIC"? msg = "subscriber": null

    return (
      <div className="confirmation-wrapper">
        <h1>Confirm email account!</h1>
        <p>Please check your inbox, spam on {this.props.email}, and click the provided link to confirm your account. This will enable login!</p>
        <p>Note: The email issuer is {bidblock_email}</p>
        {/* <button onClick={(e) => {
            console.log("what plan: ", this.props.plan)
            if(this.props.plan == "NOTSUBSCRIBER") this.props.setStateStep(3)
            if(this.props.plan == "BASIC") this.props.previousStep(e)
          }}> Previous </button> */}



        {/* <button onClick={(e) => {
          window.location.href = `/users/login`
        }}> Go to login page </button> */}
      </div>
    )
  }
}



export default Confirmation




