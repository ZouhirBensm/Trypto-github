import PageSelector from "../generic-components/PageSelector";
import CRUDConvoList from "./CRUDConvoList";

class CRUDMessages extends React.Component {
  constructor(props){
    super(props)
    const queryParams = new URLSearchParams(this.props.location.search)
    this.state = {
      msg_stream: [],
      page: 1,
      limit: 2, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      number_of_pages: 1,
    }
    this.controls = this.controls.bind(this);
    // display all query string data
    const comprehensiveUserInfoDataJSON = queryParams.get("comprehensiveUserInfo")
    this.userIdB = queryParams.get("userIdB")

    this.comprehensiveUserInfoDataObj = JSON.parse(comprehensiveUserInfoDataJSON)

    console.log(this.comprehensiveUserInfoDataObj, this.userIdB, this.props)
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

  async loadData(){
    console.log(this.props.match.params.userId)
    let response = await fetch(`${process.env.ROOT}/operations/paginated-messages/${this.props.match.params.userId}?page=${this.state.page}&limit=${this.state.limit}&userIdB=${this.userIdB}`)

    console.log(response)

    let serverOBJ = await response.json()

    if(response.ok){

      console.log("serverOBJ: ", serverOBJ)

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



  
  // TODO comprehensiveUserInfo is using the password in the object need to get rid of that
  render(){

    return (
      <React.Fragment>
        <div >CRUDMessages...</div>
        <CRUDConvoList
          // userID = {this.userId}
          // buttons='normal' 
          // order_type={this.props.match.params.order_type} 
          msg_stream={this.state.msg_stream}
          // loadData={this.loadData}
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