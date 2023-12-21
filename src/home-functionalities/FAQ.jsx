
import FAQItem from './FAQItem'
import './styles/FAQ.css'


class FAQ extends React.Component {
  constructor(props) {
    super(props)
    this.state = { faqs: [] }

    // TODO !!!!
    // Add email blocks to be able to download a resource for email in exchange! 


    // Crud on messaging components and data
    // order of faqs
    // email edit
    // first name, last name phone number
    // couleurs des popups
    // email border focus is black home page


    // Default image is pixelated profile image
    // uploaded image profile is pixelated

    // Sign in with google and meta

    // social media share market items
    // Social media: Pinterest, Facebook, Discord
    // Add contact page

    this.loadFAQtitles = this.loadFAQtitles.bind(this)

  }

  componentDidMount() {
    this.loadFAQtitles()
  }


  async loadFAQtitles() {
    let response

    response = await fetch(`/faqs?limit=5`)


    const contentType = response.headers.get('Content-Type')
    // console.log(contentType)

    let json
    if (contentType && contentType.includes('application/json')) {
      json = await response.json()
    }

    if (response.status !== 200) {
      let err = 'Response not 200 and not in JSON format.'
      if (json) err = json.error.message
      console.error(err)
      return
    }

    this.setState({ faqs: json.srv_ })
    return

  }

  render() {
    return (
      <React.Fragment>
        <div id="FAQ-main-component" className='higher-level-div'>

          <h1>FAQ</h1>

          <div id="FAQ-container">
            {this.state.faqs.map((FAQ_data, i) => {
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