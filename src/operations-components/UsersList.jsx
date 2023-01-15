import { parseFullPath4lastpath } from '../../full-stack-libs/utils'
import { Link } from 'react-router-dom';



class UsersList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.mode = parseFullPath4lastpath(window.location.href)
    // console.log("UsersList: constructor()-> this.mode:", this.mode)
    // console.log("UsersList: constructor()-> this.props.mode:", this.props.mode)
    this.users = []
    // console.log("UsersList: constructor()-> this.props.users:", this.props.users)
    console.log("UsersList: constructor()-> this.props:", this.props)
    this.userElements = undefined
  }

  componentWillReceiveProps(newProps, prevProps) {
    console.log("UsersList: componentWillReceiveProps()-> newProps:", newProps)
    this.users = newProps
    this.userElements = this.users.users.map((userElement, i) => {
      return (
        <Link to={{
          pathname: `/operations/${this.props.mode}/${userElement._id}`,
          search: `?comprehensiveSelectedUserInfo=${JSON.stringify(userElement)}`
          }} key={i}>
          <UserElement
            user={userElement}
          />
        </Link>
      )
    })


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
        <p>{this.props.user.email} ➡️ username: {this.props.user.username}</p>
      </div>
    )
  }
}


export default UsersList


