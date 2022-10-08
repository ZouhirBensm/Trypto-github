import PageSelector from "../generic-components/PageSelector";
import CRUDConvoList from "./CRUDConvoList";

class CRUDMessages extends React.Component {
  constructor(props){
    super(props)
    const queryParams = new URLSearchParams(this.props.location.search)
    this.state = {
      msg_stream: [],
      page: 1,
      limit: 5, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      number_of_pages: 1,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.loadData_andDisplayDltMsg = this.loadData_andDisplayDltMsg.bind(this)
    this.controls = this.controls.bind(this);
    // display all query string data
    const comprehensiveUserInfoDataJSON = queryParams.get("comprehensiveSelectedUserInfo")
    this.userIdB = queryParams.get("userIdB")

    this.comprehensiveUserInfoDataObj = JSON.parse(comprehensiveUserInfoDataJSON)

    // console.log(this.comprehensiveUserInfoDataObj, this.userIdB, this.props)
  }

  displayDeleteMsg(){
    // console.log("ARE WE GOOD!")
    const reactDiv = document.getElementById("react-div")
    // console.log(reactDiv)

    let div = document.getElementById("popup");
    
    // console.log(!!(div.innerHTML))
    if (!!(div.innerHTML)) {
      // console.log("div is filled")
      div.innerHTML = "Deletion successful!"
    } else {
      // console.log("div is empty")
      div.style.display = "block"
      div.innerHTML = "Deletion successful!"
      reactDiv.insertBefore(div, reactDiv.firstChild);
    }

  }

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      this.loadData()
    })
  }

  componentDidMount(){
    this.loadData()
  }

  async deleteAMessage(msg, e){
    e.preventDefault()
    // console.log(e)
    // console.log("delete", msg)

    const response = await fetch(`/operations/deletions/message/${this.props.msg.sender._id}/${this.props.msg.receiver._id}/${this.props.msg._id}`, {
      method: 'DELETE',
    })

    let serverOBJ = await response.json()

    // console.log(response)
    // console.log(serverOBJ)
  }

  async handleClick(msg, e){
    e.preventDefault()
    // console.log("click!!!!", msg)
    // console.log(e)

    // const response = await fetch(`/operations/deletions/message/${msg.sender._id}/${msg.receiver._id}/${msg._id}`, {
    //   method: 'DELETE',
    // })

    // let serverOBJ = await response.json()
    
    // if(response.ok){
    //   // let OBJserv_ = await response.json()
    //   console.log("deletion success", serverOBJ)

    //   let elements_left_in_page = document.getElementsByClassName("a-single-msg-wrapper")
    //   if(this.state.on_off_limit_next && elements_left_in_page.length === 1 && this.state.number_of_pages != 1){
    //     this.handleDelete(true)
    //   } else {
    //     this.handleDelete()
    //   }
    // } else {
    //   console.error("deletion failed!", serverOBJ)
    // }

  }

  handleDelete(_signal = false){
    // console.log(_signal);

    let number
    (!_signal)? number = 0: number = 1

    this.setState({
      page: this.state.page-number,
    }, this.loadData_andDisplayDltMsg)
  }

  async loadData_andDisplayDltMsg(){
    // console.log("add the delete successful message!")
    this.displayDeleteMsg()
    this.loadData();
  }

  async loadData(){
    // console.log(this.props.match.params.userId)
    let response = await fetch(`/operations/paginated-messages/${this.props.match.params.userId}?page=${this.state.page}&limit=${this.state.limit}&userIdB=${this.userIdB}`)

    // console.log(response)

    let serverOBJ = await response.json()

    if(response.ok){

      // console.log("serverOBJ: ", serverOBJ)

      this.setState({
        msg_stream: serverOBJ.srv_.CONVOS,
        nextPage: serverOBJ.srv_.next,
        previousPage: serverOBJ.srv_.previous,
        number_of_pages: serverOBJ.srv_.number_of_pages.number
      }, () => {
        if(this.state.nextPage==undefined){
          this.setState({
            on_off_limit_next: true
          })
        } else {
          this.setState({
            on_off_limit_next: false
          })
        }
        if(this.state.previousPage==undefined){
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

  render(){
    console.log("parent render: ", this.state.msg_stream)
    return (
      <React.Fragment>
        <div >CRUDMessages...</div>
        <CRUDConvoList
          // userID = {this.userId}
          // buttons='normal' 
          // order_type={this.props.match.params.order_type} 
          msg_stream={this.state.msg_stream}
          handleClick={this.handleClick}
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


      </React.Fragment>
    )
  }

}


export default CRUDMessages