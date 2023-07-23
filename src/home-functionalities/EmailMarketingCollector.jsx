import './styles/EmailMarketingCollector.css'
import { verifyEmail } from '../../full-stack-libs/validations'
import EMAIL_MARKETING_TYPES from '../../full-stack-libs/Types/EmailMarketingTypes'

class EmailMarketingCollector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined,
      loading: false,
    }
    this.validation = this.validation.bind(this)
    this.sendemail = this.sendemail.bind(this)
    // console.log(EMAIL_title0, EMAIL_title1, EMAIL_subtitle0, EMAIL_subtitle1)

    // console.log('JSX_to_load2--->', JSX_to_load2)
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
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
      console.log('\n', data)
    }

    if (response.status !== 200) {
      if (data) this.setState({ popup: data.message })
      return false
    }

    this.setState({
      popup: data.message
    })

    return true


  }


  validation(email, e) {


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
                <h1>{this.props.EMAIL_title}</h1>
                <p>{this.props.EMAIL_subtitle}</p>
              </div>
            </div>

            <div id='element-2'>
              <div className='content'>

                <input type="email" placeholder='Your email' id='email-for-marketing' />

                {/* BUTTON OR SPINNER */}
                {this.state.loading ?
                  <div className="spinner"></div> :
                  <React.Fragment>
                    {this.state.popup ? <span className="popup">{this.state.popup}</span> : null}
                    <button onClick={async (e) => {

                      this.setState({ loading: true })

                      // TO TEST SPINNER
                      // setTimeout(() => {
                      //   this.setState({ loading: false })
                      // }, 5000);

                      const email = document.getElementById("email-for-marketing").value;

                      const flag = this.validation(email, e)

                      if (!flag) { return this.setState({ loading: false }) }


                      const isTimedOut = this.checktimer()
                      console.log(isTimedOut)
                      if (!isTimedOut) return this.setState({ loading: false })



                      let isEmailSent = false
                      isEmailSent = await this.sendemail(email)
                      if (!isEmailSent) { console.log('isEmailSent is false', isEmailSent); return this.setState({ loading: false }); }
                      console.log('isEmailSent is true', isEmailSent)


                      if (this.props.BUTTON_text !== EMAIL_MARKETING_TYPES.DOWNLOAD) {
                        // console.log('not download mode')
                        this.setState({ loading: false })
                        return this.setState({ loading: false })
                      }

                      if (!this.props.RESOURCE_path) {
                        // console.log('no resource path')
                        return this.setState({ loading: false })
                      }

                      // DOWNLOAD
                      // console.log('download required resource!', this.props.RESOURCE_path)
                      this.downloadFile(this.props.RESOURCE_path)
                      return this.setState({ loading: false })

                    }}>
                      {this.props.BUTTON_text}
                    </button>

                  </React.Fragment>
                }

              </div>
            </div>

          </div>

        </div>
      </React.Fragment>

    );
  }

  downloadFile(RESOURCE_path) {

    const link = document.createElement('a');
    link.href = RESOURCE_path;
    link.setAttribute('download', 'saas_tools.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  checktimer() {
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



  purgeTimer() {
    localStorage.removeItem('timedOutUntil');
  }

}


export default EmailMarketingCollector

if (JSX_to_load2 === "EmailMarketingCollector") {
  const targetDivs = document.getElementsByClassName('react-div2');

  Array.from(targetDivs).forEach((div, index) => {
    let EMAIL_title = eval(`EMAIL_title${index}`)
    let EMAIL_subtitle = eval(`EMAIL_subtitle${index}`)
    let BUTTON_text = eval(`BUTTON_text${index}`)
    let RESOURCE_path = eval(`RESOURCE_path${index}`)

    const element = <EmailMarketingCollector
      EMAIL_title={EMAIL_title}
      EMAIL_subtitle={EMAIL_subtitle}
      BUTTON_text={BUTTON_text}
      RESOURCE_path={RESOURCE_path}
    />;

    ReactDOM.render(element, div);
  });
}

