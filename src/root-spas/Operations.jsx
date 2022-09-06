import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";




// import Admin_Block from '../operations-components/Admin-Block';
// import ArticlesDashboard from '../operations-components/ArticlesDashboard';
// import UserSelect from '../operations-components/UserSelect';
// import NotFound from '../generic-components/NotFound';
// import ScrollToTop from '../generic-components/ScrollToTop';


import '../style/reactDivMobile.css'

import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';



const Admin_Block = loadable(() => import("../operations-components/Admin-Block"),{
  fallback: <Loading/>
});
const ArticlesDashboard = loadable(() => import("../operations-components/ArticlesDashboard"),{
  fallback: <Loading/>
});
const UserSelect = loadable(() => import("../operations-components/UserSelect"),{
  fallback: <Loading/>
});
const NotFound = loadable(() => import("../generic-components/NotFound"),{
  fallback: <Loading/>
});
const ScrollToTop = loadable(() => import("../generic-components/ScrollToTop"),{
  fallback: <Loading/>
});




// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

class Operations extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    console.log(`you are in: ${window.location.href}`)
    console.log()

  }


  render() {
    return (
      <React.Fragment>
        {/* forceRefresh = force refresh on route change */}
        {/* getUserConfirmation = gives a promp on the page when going to new route*/}
        <BrowserRouter>
          <ScrollToTop/>
          {/* <Route exact path="/operations" render={
            (props) => <Admin_Block {...props} className="some-class" title="Some title"/>
          }/>  */}
          
          
            
          <Switch>

          <Route exact path="/operations">
            <Admin_Block className="horders" title="Help for Orders" link="/operations/help-for-orders"/>
            <Admin_Block className="mmessages" title="Monitor Messages" link="/operations/monitor-messages"/>
            <Admin_Block className="msubs" title="Manage Subscriptions" link="/operations/manage-subs"/>
            <Admin_Block className="articlesd" title="Articles dashbord" link="/operations/articles-dashboard"/>
          </Route>


          {/* <Route path="/operations/help-for-orders" component={UserSelect}></Route> */}
          <Route path="/operations/help-for-orders" render={
            (props) => <UserSelect {...props} test="test1"/>
          }/> 
          {/* <Route path="/operations/monitor-messages" component={UserSelect}></Route> */}
          <Route path="/operations/monitor-messages" render={
            (props) => <UserSelect {...props} test="test2"/>
          }/> 
          {/* <Route path="/operations/manage-subs" component={UserSelect}></Route> */}
          <Route path="/operations/manage-subs" render={
            (props) => <UserSelect {...props} test="test3"/>
          }/> 
          {/* <Route path="/operations/articles-dashboard" component={ArticlesDashboard}></Route> */}


          <Route path="/operations/articles-dashboard" render={
            (props) => <ArticlesDashboard {...props}/>
          }/> 

          
 

          <Route render={
            (props) => <NotFound {...props}/>
          }/> 


          </Switch>
        </BrowserRouter>

        
      </React.Fragment>
    );
  }
}




const element = <Operations />;

ReactDOM.render(element, document.getElementById('react-div'));


export default Operations

