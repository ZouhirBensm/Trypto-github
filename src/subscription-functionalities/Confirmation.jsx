


class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined
    }
    this.resendConfirmEmail = this.resendConfirmEmail.bind(this)
  }

  async resendConfirmEmail(email) {
    console.log("resendConfirmEmail", email)


    let response = await fetch(`/resend-user-email/${email}`, {
      method: 'GET',
    })

    console.log(response)
    
    if (response.status == 200) {
      let server = await response.json()
      console.log(server)
      this.setState({
        popup: server.message
      })
      return true
    } else {
      let server = await response.text()
      console.log(server)

      this.setState({
        popup: server
      })
      return false
    }

  }



  render() {

    console.log("ppppppp", bidblock_email)
    // let msg
    // this.props.plan == "NOTSUBSCRIBER"? msg = "user": null
    // this.props.plan == "BASIC"? msg = "subscriber": null

    return (
      <div className="confirmation-wrapper">
        <h1>Confirm email account!</h1>
        <p>Success! Please check your inbox, spam on {this.props.email}, and click the provided link to confirm your account. This will enable login!</p>
        <p>Note: The email issuer is {bidblock_email}</p>

        <button onClick={async (e) => {
          let isResent
          try {
            isResent = await this.resendConfirmEmail(this.props.email);
          } catch (error) {
            console.error("--->", error)
          }
          console.log({isResent})
        }}>Re-send confirmation email</button>
        {/* <button onClick={(e) => {
            console.log("what plan: ", this.props.plan)
            if(this.props.plan == "NOTSUBSCRIBER") this.props.setStateStep(3)
            if(this.props.plan == "BASIC") this.props.previousStep(e)
          }}> Previous </button> */}

        {this.state.popup ?
          <p>{this.state.popup}</p>
          : null}


        {/* <button onClick={(e) => {
          window.location.href = `/users/login`
        }}> Go to login page </button> */}

      </div>
    )
  }
}



export default Confirmation




