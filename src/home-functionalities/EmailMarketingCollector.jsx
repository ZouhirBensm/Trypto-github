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
    // console.log(title0, title1, subtitle0, subtitle1)
    // console.log(title0, title1, subtitle0, subtitle1)
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
        <div>
          <div id="email-marketing-main-component" className='higher-level-div'>
            <img src="/img/SVG/home/email-collector/bk2.svg" alt="" />

            <div id='element-1'>
              <div className='content'>
                <h1>{this.props.title}</h1>
                <p>{this.props.subtitle}</p>
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


                  const isTimedOut = this.checktimer()
                  console.log(isTimedOut)

                  if (!isTimedOut) return


                  
                  let isEmailSent = false

                  isEmailSent = await this.sendemail(email)

                  console.log('isEmailSent', isEmailSent)
                  return

                }}>Send</button>
              </div>
            </div>

          </div>

        </div>
      </React.Fragment>

    );
  }

  checktimer(){
    let timedOutUntil = localStorage.getItem('timedOutUntil');

    let enabled
    const timeOffset = parseInt(5 * 60 * 1000) // 5 MIN
    // NO TIMER WAS SET
    if (!timedOutUntil) {
      // SETTING TIMER 1 MIN
      timedOutUntil = new Date().getTime() + timeOffset;
      localStorage.removeItem('timedOutUntil');
      localStorage.setItem('timedOutUntil', timedOutUntil);
      enabled = true

      return enabled
    } else {
      // A TIMER WAS SET
      
      if (new Date().getTime() > timedOutUntil) {

        enabled = true
        
        // SET NEW TIMER
        timedOutUntil = new Date().getTime() + timeOffset;
        localStorage.removeItem('timedOutUntil');
        localStorage.setItem('timedOutUntil', timedOutUntil);

      } else {
        enabled = false
        const message = "Please do not try to spam our website. If you persist you will get flagged and declared to the governement's anti fraud department."
        this.setState({
          popup: message
        })
      }
      // TIME HAS NOT ELAPSED, TIME HAS ELAPSED
      return enabled
    }
    
  }



  purgeTimer(){
    localStorage.removeItem('timedOutUntil');
  }

}


export default EmailMarketingCollector


const targetDivs = document.getElementsByClassName('react-div2');

Array.from(targetDivs).forEach((div, index) => {
  let title = eval(`title${index}`)
  let subtitle = eval(`subtitle${index}`)

  const element = <EmailMarketingCollector 
    title={title}
    subtitle={subtitle}
  />;

  ReactDOM.render(element, div);
});
