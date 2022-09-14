import Profile from '../login-register-functionalities/Profile'
class ManageSubscriptions extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selectedUser: undefined
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
        selectedUser: serverOBJ.selectedUser
      })

    } else {

    }

  }

  render(){

    console.log("This is goin in the Profile component", this.state.selectedUser)

    return (
      <React.Fragment>
        <div>ManageSubscriptions...</div>
        {this.state.selectedUser?
          // <h1>Bam</h1>
          <Profile usedUserID={this.props.selected_userID} selectedUser={this.state.selectedUser}/>
          :
          null
        }
      </React.Fragment>

    )
  }
}

export default ManageSubscriptions