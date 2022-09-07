import React from 'react';
import Operations from '../root-spas/Operations';
import { Link, BrowserRouter, Route, Switch, useRouteMatch } from 'react-router-dom';

class UserSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (

      <React.Fragment>

        <BrowserRouter>
          <Switch>
            <Route path='/operations/*'>
              <div>Hello this is the user select component {this.props.test}</div>
              <ul>
                <li><Link to='/operations'>Back</Link></li>
              </ul>
            </Route>

            <Route path="/operations" render={
              (props) => <Operations {...props} />
            } />

          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default UserSelect