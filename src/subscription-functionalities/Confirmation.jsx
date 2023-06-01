// import OnPageFooter from '../generic-components/OnPageFooter'
import './styles/Confirmation.css'


class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined
    }
    this.resendConfirmEmail = this.resendConfirmEmail.bind(this)
  }

  async resendConfirmEmail(email) {
    console.log("resendConfirmEmail()->email: ", email)

    if (!email){
      const notif = 'No email was set'
      return this.setState({
        popup: notif
      })
    }


    let response = await fetch(`/resend-user-email/${email}`, {
      // TODO ! Make sure I am using the proper HTTP methods, status codes in all my fetch statements, and that they are not enclosed in trycatches
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

    console.log("render()->bidblock_email: ", bidblock_email)


    return (
      <React.Fragment>
        <div id="confirmation-wrapper">
          <h1>Confirm email account!</h1>
  
          <p>Success! Please check your inbox, spam, {this.props.username}, and click the provided link to confirm your account. This will enable login!<br/>
         <b>Note</b>: The email issuer is {bidblock_email}</p>
  
          
  
          <button className='generic-button' onClick={async (e) => {
            let isResent
            try {
              isResent = await this.resendConfirmEmail(this.props.email);
            } catch (error) {
              console.error("--->", error)
            }
            console.log({isResent})
          }}>Re-send confirmation email</button>
  
          {this.state.popup ?
            <div id='notif'>{this.state.popup}</div>
            : null}
  
        </div>
        {/* <OnPageFooter/> */}
      </React.Fragment>
    )
  }
}



export default Confirmation




