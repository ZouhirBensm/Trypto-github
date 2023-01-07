import '../style/reactDivMobile.css'
import '../style/googlemaps.css'

import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";

const SetAssociatedLocality = loadable(() => import('../settings-functionalities/SetAssociatedLocality'), {
  fallback: <Loading />
});

import Test2 from '../settings-functionalities/Test2'
import Test3 from '../settings-functionalities/Test3'
import Test4 from '../settings-functionalities/Test4'

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

    var reactDiv = document.getElementById("react-div");
    console.log(reactDiv, the_map, autocomplete_block)
    
    reactDiv.appendChild(autocomplete_block);
    reactDiv.appendChild(the_map);

  }


  render() {

    // console.log("Settings: render()->userId: ", userId)
    // console.log("Settings: render()->user: ", user)
    console.log("Settings: render()->selectedUser: ", selectedUser)

    return (

      // Home
      <React.Fragment>
        <BrowserRouter>
          <Link to='/settings/set-users-associated-locality'>Associated Locality</Link> <br />
          <Link to='/settings/test2'>Test2</Link> <br />
          <Link to='/settings/test3'>Test3</Link> <br />
          <Link to='/settings/test4'>Test4</Link> <br />

          <Switch>

            <Route path="/settings/set-users-associated-locality" render={
              (props) => <SetAssociatedLocality {...props}
                userID_toWorkWith={userId}
                selectedUser={selectedUser}
              />
            } />

            <Route path="/settings/test2" render={
              (props) => <Test2 {...props} />
            } />
            <Route path="/settings/test3" render={
              (props) => <Test3 {...props} />
            } />
            <Route path="/settings/test4" render={
              (props) => <Test4 {...props} />
            } />

          </Switch>
        </BrowserRouter>


      </React.Fragment>

    );
  }



}

const element = <Settings />;


ReactDOM.render(element, document.getElementById('react-div'));


export default Settings