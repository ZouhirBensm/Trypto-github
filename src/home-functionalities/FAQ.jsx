import FAQItem from './FAQItem'
import './styles/FAQ.css'


class FAQ extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

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

    
    // TODO !!!!
    // Temporarly getting the data from this Element, but going to use a database in the future or something
    this.FAQ_datas = [
      {
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, libero?',
        link: '#',
      },
      {
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, libero?',
        link: '#',
      },
      {
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, libero?',
        link: '#',
      }
    ]

    // this.loadFAQtitles = this.loadFAQtitles.bind(this)

  }


  render() {
    return (
      <React.Fragment>
        <div id="FAQ-main-component" className='higher-level-div'>

          <h1>FAQ</h1>

          <div id="FAQ-container">
            {this.FAQ_datas.map((FAQ_data, i)=>{
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