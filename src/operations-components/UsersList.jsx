import { parseFullPath4lastpath } from '../../full-stack-libs/utils'
import { Link } from 'react-router-dom';
import './styles/UsersList.css'



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
      <div id='user-list'>
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

      <React.Fragment>
        <div className='user-item'>
          <span> {this.props.user.username}</span>
          <span> {this.props.user.email}</span>
        </div>

      </React.Fragment>


    )
  }
}


export default UsersList


