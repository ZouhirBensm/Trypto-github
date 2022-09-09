import { parseFullPath4lastpath } from '../../full-stack-libs/utils'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';



class UsersList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.mode = parseFullPath4lastpath(window.location.href)
    console.log("from path:", this.mode)
    console.log("from props:", this.props.mode)
    this.users = []
    console.log("HERE!", this.props.users)
    console.log(this.props)
    this.userElements = undefined
  }

  componentWillReceiveProps(newProps, prevProps) {
    console.log("what we got?", newProps)
    this.users = newProps
    console.log("this.users:", this.users)
    this.userElements = this.users.users.map((userElement, i) => {
      return (
        // `/operations/${this.props.mode}/${userElement._id}`
        <Link to={`/operations/${this.props.mode}/${userElement._id}`} key={i}>
          <UserElement
            user={userElement}
          />
          {/* <BrowserRouter>
            <Switch>
              <Route path={`/test`}>
                OKKKK
              </Route>
            </Switch>
          </BrowserRouter> */}
        </Link>
      )
    })
    // if (this.users) {
    // } else {
    //   console.error(`this.users resolved to a false for some reason`)
    // }


  }
  render() {
    return (
      <div>
        UserList...
        {this.userElements}
      </div>
    )
  }
}





class UserElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className='user-element-wrapper'>
        <p>{this.props.user.email}</p>
      </div>
    )
  }
}


export default UsersList


