import RootFAQ from '../home-functionalities/RootFAQ'
import { Link, BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import '../style/reactDivMobile.css'


class FAQPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.goBack = this.goBack.bind(this)
  }

  goBack = () => {
    console.log(this.props.history)
    this.props.history.goBack();
  };

  render() {

    return (

      // Home
      <React.Fragment>
        <div id="FAQ-high-component">
          

          <BrowserRouter>
            <Switch>
              <Route exact path='/FAQ/:faq'>
                  <div>Particualr FAQ</div>
                  <Link to='/FAQ'>Root FAQ</Link>
                  <br />
                  <button onClick={this.goBack}>Go Back</button>
              </Route>


              {/* <Route path="/operations" render={
                (props) => <Operations {...props} />
              } /> */}


              <Route path="/FAQ" render={
                (props) => <RootFAQ {...props} />
              } />


            </Switch>
          </BrowserRouter>


        </div>



      </React.Fragment>

    );
  }



}

// const element = <FAQPage />;
// ReactDOM.render(element, document.getElementById('react-div'));
// export default FAQPage;


const FAQPageWithRouter = withRouter(FAQPage);

const element = (
  <BrowserRouter>
    <FAQPageWithRouter />
  </BrowserRouter>
);

ReactDOM.render(element, document.getElementById('react-div'));

export default FAQPageWithRouter;