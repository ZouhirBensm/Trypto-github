import '../style/reactDivMobile.css'
import SetAssociatedLocality from '../settings-functionalities/SetAssociatedLocality'
import Test2 from '../settings-functionalities/Test2'
import Test3 from '../settings-functionalities/Test3'
import Test4 from '../settings-functionalities/Test4'

import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

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
              (props) => <SetAssociatedLocality {...props} />
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