import React from 'react';
import Operations from '../root-spas/Operations';
import UsersList from './UsersList'
import PageSelector from '../generic-components/PageSelector'
import OperationActions from '../operations-components/OperationActions'
import { Link, BrowserRouter, Route, Switch, useRouteMatch } from 'react-router-dom';

class UserSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      page: 1,
      limit: 1, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      number_of_pages: 1,
    }
    this.controls = this.controls.bind(this);
  }

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      this.loadData()
    })
  }

  componentDidMount() {
    //DOM is ready
    this.loadData()
  }

  async loadData() {
    let response = await fetch(`${process.env.ROOT}/operations/paginated-users/users-for-display?page=${this.state.page}&limit=${this.state.limit}`)

    let serverOBJ = await response.json()

    console.log(serverOBJ)

    if (response.ok) {

      console.log("serverOBJ: ", serverOBJ)

      this.setState({
        users: serverOBJ.srv_.USERS,
        nextPage: serverOBJ.srv_.next,
        previousPage: serverOBJ.srv_.previous,
        number_of_pages: serverOBJ.srv_.number_of_pages.number
      }, () => {
        if (this.state.nextPage == undefined) {
          this.setState({
            on_off_limit_next: true
          })
        } else {
          this.setState({
            on_off_limit_next: false
          })
        }
        if (this.state.previousPage == undefined) {
          this.setState({
            on_off_limit_previous: true
          })
        } else {
          this.setState({
            on_off_limit_previous: false
          })
        }
      })
      // Custom Errors get spitted out here
    } else {
      console.error("Error: ", serverOBJ)
    }

  }

  render() {
    console.log("BEFORE", this.state.users)
    return (

      <React.Fragment>

        <BrowserRouter>
          <Switch>
            <Route exact path='/operations/:mode'>
              <UsersList
                users={this.state.users}
                mode={this.props.mode}
              />
              <PageSelector
                number_of_pages={this.state.number_of_pages}
                page={this.state.page}
                on_off_limit_previous={this.state.on_off_limit_previous}
                on_off_limit_next={this.state.on_off_limit_next}
                previousPage={this.state.previousPage}
                nextPage={this.state.nextPage}
                controls={this.controls}
              />


              <hr />
              <div>Hello this is the user select component {this.props.mode}</div>
              <ul>
                <li><Link to='/operations'>Back</Link></li>
              </ul>
            </Route>

            <Route exact path="/operations" render={
              (props) => <Operations {...props} />
            } />

            <Route path={`/operations/:mode/:selected_userID`} render={
              (props) => <OperationActions {...props}/>
            }/> 

          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default UserSelect