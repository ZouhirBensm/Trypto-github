import './styles/EmailMarketingCollector.css'
import { verifyEmail } from '../../full-stack-libs/validations'

class EmailMarketingCollector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined
    }
    this.validation = this.validation.bind(this)
    this.sendemail = this.sendemail.bind(this)
  }

  async sendemail(email) {

    let response
    response = await fetch('/marketing/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })

    const contentType = response.headers.get('Content-Type')
    console.log(contentType)
    
    let data
    if (contentType && contentType.includes('application/json')){
      data = await response.json()
      console.log('\n', data)
    }
    
    if(response.status !== 200) {
      if(data) this.setState({popup: data.message})
      return false
    }

    this.setState({
      popup: data.message
    })

    return true


  }


  validation(email, e){
    

    console.log(email)

    let flag, notification = [];

    ({ flag, notification } = verifyEmail(email));
    if (!email && !flag) notification = ['Email payload empty.']

    console.log("flag, notification: ", flag, notification)

    this.setState({
      popup: flag ? undefined : notification[0]
    })
    
    return flag
    
  }


  render() {

    return (
      <React.Fragment>
        <div id="email-marketing-main-component">
          <img src="/img/SVG/home/email-collector/bk2.svg" alt="" />

          <div id='element-1'>
            <div className='content'>
              <h1>Get product update news, and newsletter</h1>
              <p>Be part of our community. Be a priviledged informed user about new implementations, and web software updates. Be informed with Bidblock's progess.</p>
            </div>
          </div>

          <div id='element-2'>
            <div className='content'>
              <input type="text" placeholder='Your email' id='email-for-marketing'/>

              {this.state.popup ?
                <span className="popup">{this.state.popup}</span> :
                null
              }

              <button onClick={async (e)=>{
                const email = document.getElementById("email-for-marketing").value;

                const flag = this.validation(email, e)

                if (!flag) {return}
                
                let isEmailSent = false

                isEmailSent = await this.sendemail(email)

                console.log('isEmailSent', isEmailSent)
                return

              }}>Send</button>
            </div>
          </div>

        </div>
      </React.Fragment>

    );
  }

}


export default EmailMarketingCollector