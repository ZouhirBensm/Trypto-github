import Profile from '../login-register-functionalities/Profile3'
class ManageSubscriptions extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selectedUser: undefined,
      error_popup: undefined
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

    let serverOBJ
    serverOBJ = await response.json()
    console.log(serverOBJ)

    if(response.ok) {
  
      this.setState({
        selectedUser: serverOBJ.selectedUser
      })

    } else {
      this.setState({
        error_popup: serverOBJ.error.message.admin_message || serverOBJ.error.message.join(", ")
      })
    }

  }

  render(){
    let error_div = null
    if(this.state.error_popup) {
      error_div = <div className="error-popup">{this.state.error_popup}</div>
    }

    console.log("This is goin in the Profile component", this.state.selectedUser, this.state.error_popup, error_div)

    return (
      <React.Fragment>
        <div>ManageSubscriptions...</div>
        {error_div}
        {this.state.selectedUser?
          // <h1>Bam</h1>
          <Profile 
          usedUserID={this.props.selected_userID} 
          selectedUser={this.state.selectedUser}
          profileimagename={this.props.profileimagename}
          />
          :
          null
        }
      </React.Fragment>

    )
  }
}

export default ManageSubscriptions