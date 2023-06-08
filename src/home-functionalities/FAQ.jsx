
import FAQItem from './FAQItem'
import './styles/FAQ.css'


class FAQ extends React.Component {
  constructor(props) {
    super(props)
    this.state = {faqs: []}

    // TODO !!!!! give public access to market pages all
    // get rid of userID on the profiles page
    // couleurs des popups
    // user needs to accept terms and conditions on sign up
    // add bid block logo en haut a gauche
    // Desktop dashboards on home banner
    // Spelling errors
    // home banner: facilitate
    // home banner: upcoming
    // home banner cards: on in app: deposit in bitcoin wallet
    // home banner cards Upcomming: Upcoming
    // Grossir les width des price tooglers market items

    this.loadFAQtitles = this.loadFAQtitles.bind(this)

  }

  componentDidMount(){
    this.loadFAQtitles()
  }


  async loadFAQtitles(){
    let response

    response = await fetch(`/faqs?limit=5`)


    const contentType = response.headers.get('Content-Type')
    // console.log(contentType)

    let json
    if (contentType && contentType.includes('application/json')){
      json = await response.json()
    }

    if(response.status !== 200) {
      let err = 'Response not 200 and not in JSON format.'
      if(json) err =  json.error.message
      console.error(err)
      return
    }

    this.setState({faqs: json.srv_})
    return

  }

  render() {
    return (
      <React.Fragment>
        <div id="FAQ-main-component" className='higher-level-div'>

          <h1>FAQ</h1>

          <div id="FAQ-container">
            {this.state.faqs.map((FAQ_data, i)=>{
              return <FAQItem
                key={i}
                title={FAQ_data.title}
                link={FAQ_data.link}
              />
            })}
          </div>


          <a href="/FAQ">See all topics</a>

        </div>
      </React.Fragment>

    );
  }

}


export default FAQ