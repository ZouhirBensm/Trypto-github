import '../style/reactDivMobile.css'
import '../style/googlemaps.css'

import './styles/Settings.css'


import OnPageFooter from '../generic-components/OnPageFooter'

import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";

const SetAssociatedLocality = loadable(() => import('../settings-functionalities/SetAssociatedLocality2'), {
  fallback: <Loading />
});

// import Test2 from '../settings-functionalities/Test2'
// import Test3 from '../settings-functionalities/Test3'
// import Test4 from '../settings-functionalities/Test4'

import { NavLink, Link, BrowserRouter, Route, Switch } from 'react-router-dom';

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    the_map.style.display = "none"
    autocomplete_block.style.display = "none"
  }


  render() {

    // console.log("Settings: render()->userId: ", userId)
    // console.log("Settings: render()->user: ", user)
    // console.log("Settings: render()->selectedUser: ", selectedUser)

    return (

      // Home
      <React.Fragment>
        <main>
          <h1>Settings</h1>
          <BrowserRouter>

            <div className="settings-nav">
              <NavLink activeClassName="active" to='/settings/set-users-associated-locality'>Location Settings</NavLink>

              {/* <NavLink activeClassName="active" to='/settings/test2'>Test2</NavLink> */}


            </div>

            <Switch>
              <Route path="/settings/set-users-associated-locality" render={
                (props) => <SetAssociatedLocality {...props}
                  userID_toWorkWith={userId}
                  selectedUser={selectedUser}
                />
              } />
              {/* 
              <Route path="/settings/test2" render={
                (props) => <Test2 {...props} />
              } /> */}

            </Switch>

          </BrowserRouter>
        </main>



        <OnPageFooter />


      </React.Fragment>

    );
  }



}

const element = <Settings />;


ReactDOM.render(element, document.getElementById('react-div'));


export default Settings