import '../style/reactDivMobile.css'
import '../style/googlemaps.css'

import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";

const SetAssociatedLocality = loadable(() => import('../settings-functionalities/SetAssociatedLocality2'), {
  fallback: <Loading />
});

// import Test2 from '../settings-functionalities/Test2'
// import Test3 from '../settings-functionalities/Test3'
// import Test4 from '../settings-functionalities/Test4'

import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';

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
        <h1>Settings</h1>
        <BrowserRouter>
          <Link to='/settings/set-users-associated-locality'>Location Settings</Link>

          {/* <Link to='/settings/test2'>Test2</Link>
          <Link to='/settings/test3'>Test3</Link>
          <Link to='/settings/test4'>Test4</Link> */}

          <Switch>

            <Route path="/settings/set-users-associated-locality" render={
              (props) => <SetAssociatedLocality {...props}
                userID_toWorkWith={userId}
                selectedUser={selectedUser}
              />
            } />

            {/* <Route path="/settings/test2" render={
              (props) => <Test2 {...props} />
            } />
            <Route path="/settings/test3" render={
              (props) => <Test3 {...props} />
            } />
            <Route path="/settings/test4" render={
              (props) => <Test4 {...props} />
            } /> */}

          </Switch>

        </BrowserRouter>


      </React.Fragment>

    );
  }



}

const element = <Settings />;


ReactDOM.render(element, document.getElementById('react-div'));


export default Settings