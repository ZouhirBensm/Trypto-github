import OnPageFooter from '../generic-components/OnPageFooter';
import RootFAQ from '../home-functionalities/RootFAQ'
import ParticularFAQ from '../home-functionalities/ParticularFAQ'
import { Link, BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import '../style/reactDivMobile.css'

import './styles/FAQPage.css'






class FAQPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { faqs: [] }
    // this.goBack = this.goBack.bind(this)
    
    this.loadFAQtitles = this.loadFAQtitles.bind(this)
  }

  componentDidMount() {
    this.loadFAQtitles()
  }



  async loadFAQtitles() {
    let response

    response = await fetch(`/faqs`)


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

  // goBack = () => {
  //   console.log(this.props.history)
  //   this.props.history.goBack();
  // };

  render() {
    // console.log('\n\n', this.state.faqs, '\n\n')
    // console.log('\n\n', window.location.pathname, '\n\n')

    const faq = this.state.faqs.find(faq => faq.link == window.location.pathname);

    console.log("\n\nfaq: ", faq, "\n\n")

    return (

      // Home
      <React.Fragment>
        <div id="FAQ-high-component" className='FAQPage'>


          <BrowserRouter>
            <Switch>

              <Route exact path='/FAQ/:faq' render={
                (props) => <ParticularFAQ {...props} 
                // faqs={this.state.faqs}
                faq={faq}
                />
              } />


              {/* <Route exact path='/FAQ/:faq'>
                <div>Particualr FAQ</div>
                <Link to='/FAQ'>Root FAQ</Link>
                <br />
                <button onClick={this.goBack}>Go Back</button>
              </Route> */}



              <Route path="/FAQ" render={
                (props) => <RootFAQ {...props} 
                faqs={this.state.faqs}
                />
              } />


            </Switch>
          </BrowserRouter>


        </div>

        <OnPageFooter/>



      </React.Fragment>

    );
  }



}

const element = <FAQPage />;
ReactDOM.render(element, document.getElementById('react-div'));
export default FAQPage;


// const FAQPageWithRouter = withRouter(FAQPage);

// const element = (
//   <BrowserRouter>
//     <FAQPageWithRouter />
//   </BrowserRouter>
// );

// ReactDOM.render(element, document.getElementById('react-div'));

// export default FAQPageWithRouter;