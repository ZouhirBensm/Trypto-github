import './styles/EmailMarketingCollector.css'

class EmailMarketingCollector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
              <input type="text" placeholder='Your email'/>
              <button>Send</button>
            </div>
          </div>

        </div>
      </React.Fragment>

    );
  }

}


export default EmailMarketingCollector