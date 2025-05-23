import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";
import '../style/reactDivMobile.css'
import './styles/Operations.css'

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';



const Admin_Block = loadable(() => import("../operations-components/Admin-Block"), {
  fallback: <Loading />
});
const ArticlesDashboard = loadable(() => import("../operations-components/ArticlesDashboard"), {
  fallback: <Loading />
});

const ControlFAQ = loadable(() => import("../operations-components/ControlFAQ"), {
  fallback: <Loading />
});

const UserSelect = loadable(() => import("../operations-components/UserSelect"), {
  fallback: <Loading />
});
const ScrollToTop = loadable(() => import("../generic-components/ScrollToTop"), {
  fallback: <Loading />
});

// const NotFound = loadable(() => import("../generic-components/NotFound"),{
//   fallback: <Loading/>
// });




// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

class Operations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    
  }




  render() {
    return (
      <React.Fragment>

        <BrowserRouter basename="/operations">
          <ScrollToTop />
          <Switch>

            <Route exact path="/">
              <div id="operations-main-menu">
                <div id="menu">
                  <Admin_Block className="mmessages" title="Monitor Messages" link="/monitor-messages" />
                  <Admin_Block className="msubs" title="Manage Subscriptions" link="/manage-subs" />
                  <Admin_Block className="hmorders" title="Help for Market orders" link="/help-for-market-orders" />
                  <Admin_Block className="ssettings" title="Set Settings" link="/set-settings" />
                  <Admin_Block className="articlesd" title="Articles dashbord" link="/articles-dashboard" />
                  <Admin_Block className="addfaq" title="Control FAQ" link="/control-faq" />

                </div>
              </div>

            </Route>


            <Route path="/monitor-messages" render={
              (props) => <UserSelect {...props} mode="monitor-messages" />
            } />

            <Route path="/manage-subs" render={
              (props) => <UserSelect {...props} mode="manage-subs" />
            } />

            <Route path="/help-for-market-orders" render={
              (props) => <UserSelect {...props} mode="help-for-market-orders" />
            } />

            <Route path="/set-settings" render={
              (props) => <UserSelect {...props} mode="set-settings" />
            } />


            <Route path="/articles-dashboard" render={
              (props) => <ArticlesDashboard {...props} />
            } />

            <Route path="/control-faq" render={
              (props) => <ControlFAQ {...props} />
            } />

          </Switch>
        </BrowserRouter>




      </React.Fragment>
    );
  }
}




const element = <Operations />;

ReactDOM.render(element, document.getElementById('react-div'));


export default Operations

