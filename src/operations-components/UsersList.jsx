import { parseFullPath4lastpath } from '../../full-stack-libs/utils'
import { Link } from 'react-router-dom';
import './styles/UsersList.css'



class UsersList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userElements: undefined
    }
    this.mode = parseFullPath4lastpath(window.location.href)
    // console.log("UsersList: constructor()-> this.mode:", this.mode)
    // console.log("UsersList: constructor()-> this.props.mode:", this.props.mode)
    // console.log("UsersList: constructor()-> this.props.users:", this.props.users)
    console.log("UsersList: constructor()-> this.props:", this.props)
    // this.userElements

    this.setupUserElements = this.setupUserElements.bind(this)
  }

  componentWillReceiveProps(newProps, prevProps) {
    console.log("UsersList: componentWillReceiveProps()-> newProps:", newProps)

    this.setupUserElements(newProps.users)


  }

  setupUserElements(users) {

    this.setState(prevState => {
      let userElements = users.map((userElement, i) => {
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

      return { userElements: userElements }

    })
  }


  componentDidMount() {

    this.setupUserElements(this.props.users)

  }


  render() {
    console.log(this.state.userElements)


    return (
      <div id='user-list'>
        {this.state.userElements}
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


