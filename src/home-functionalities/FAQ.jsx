import FAQItem from './FAQItem'
import './styles/FAQ.css'


class FAQ extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

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

  }


  render() {
    return (
      <React.Fragment>
        <div id="FAQ-main-component">

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


          <a href="#">See all topics</a>

        </div>
      </React.Fragment>

    );
  }

}


export default FAQ