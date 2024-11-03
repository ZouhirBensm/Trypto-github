
import { withRouter } from 'react-router-dom';
import FAQItem from '../home-functionalities/FAQItem'

import './styles/RootFAQ.css'

class RootFAQ extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { faqs: [] }
    this.state = { }

    // this.loadFAQtitles = this.loadFAQtitles.bind(this)

  }

  goBack = () => {
    this.props.history.goBack();
  };

  // componentDidMount() {
  //   this.loadFAQtitles()
  // }

  // async loadFAQtitles() {
  //   let response

  //   response = await fetch(`/faqs`)


  //   const contentType = response.headers.get('Content-Type')
  //   // console.log(contentType)

  //   let json
  //   if (contentType && contentType.includes('application/json')) {
  //     json = await response.json()
  //   }

  //   if (response.status !== 200) {
  //     let err = 'Response not 200 and not in JSON format.'
  //     if (json) err = json.error.message
  //     console.error(err)
  //     return
  //   }

  //   this.setState({ faqs: json.srv_ })
  //   return

  // }

  render() {

    return (

      <React.Fragment>

        <div id="FAQ-main-component" className='higher-level-div RootFAQ'>

          <h1>FAQ</h1>

          <div id="FAQ-container">
            {this.props.faqs.map((FAQ_data, i) => {
              return <FAQItem
                key={i}
                title={FAQ_data.title}
                link={FAQ_data.link}
              />
            })}
          </div>

          <button onClick={this.goBack}>
            <img src="/img/SVG/home/faq/back.svg" alt="" />
          </button>


        </div>
      </React.Fragment>

    );
  }



}



// export default RootFAQ
export default withRouter(RootFAQ);