// import React from 'react';
import Operations from '../root-spas/Operations';
import UsersList from './UsersList'
import PageSelector from '../generic-components/PageSelector'
import OperationActions from '../operations-components/OperationActions'
import MarketOrderDetails from '../marketplace-functionalities/MarketOrderDetails'

import './styles/UserSelect.css'

import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';


class UserSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      page: 1,
      limit: 3,
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
    this.loadData()
  }

  async loadData() {
    let response = await fetch(`/operations/paginated-users/users-for-display?page=${this.state.page}&limit=${this.state.limit}`)

    let serverOBJ = await response.json()

    // console.log("UserSelect: loadData()->serverOBJ: ", serverOBJ)

    if (response.ok) {
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
    } else {
      console.error("Error: ", serverOBJ)
    }

  }

  render() {
    return (

      <React.Fragment>

        <BrowserRouter>
          <Switch>
            <Route exact path='/operations/:mode'>
              <dl>
                <dt>Component:</dt>
                <dd>UserSelect</dd>
                <dt>this.props.mode:</dt>
                <dd>{this.props.mode}</dd>
              </dl>


 
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

              <Link to='/operations'>
                <img src="/img/SVG/operations/user-list/back.svg" alt="" />
              </Link>
            </Route>

            <Route exact path="/operations" render={
              (props) => <Operations {...props} />
            } />

            <Route path={`/operations/:mode/:selected_userID`} render={
              (props) => <OperationActions {...props} />
            } />


            <Route path="/marketplace/:order_type/:orderID" render={
              (props) => <MarketOrderDetails {...props} />
            } />


          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default UserSelect