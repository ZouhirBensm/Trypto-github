import Profile from '../login-register-functionalities/Profile'
class ManageSubscriptions extends React.Component {
  constructor(props){
    super(props)
    this.state={
      // TODO rename this variable
      sessionUser: undefined
    }
    console.log("userId: ", this.props.selected_userID)
    this.loadData = this.loadData.bind(this)
  }

  componentDidMount(){
    this.loadData()
  }

  async loadData(){
    console.log("LOAD F IN DATA!!!!")
    let response
    response = await fetch(`/operations/detailed-user-information/${this.props.selected_userID}`, {
      method: "GET"
    })

    console.log(response)

    if(response.ok) {
      let serverOBJ
      serverOBJ = await response.json()
      console.log(serverOBJ)
  
      this.setState({
        sessionUser: serverOBJ.sessionUser
      })

    } else {

    }

  }

  render(){

    console.log("This is goin in the Profile component", this.state.sessionUser)

    return (
      <React.Fragment>
        <div>ManageSubscriptions...</div>
        {this.state.sessionUser?
          // <h1>Bam</h1>
          <Profile usedUserID={this.props.selected_userID} sessionUser={this.state.sessionUser}/>
          :
          null
        }
      </React.Fragment>

    )
  }
}

export default ManageSubscriptions