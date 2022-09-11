
class CRUDMessages extends React.Component {
  constructor(props){
    super(props)
    const queryParams = new URLSearchParams(this.props.location.search)
    this.state = {
      page: 1,
      limit: 3, //Limit per page defined here!
    }
    // display all query string data
    const comprehensiveUserInfoDataJSON = queryParams.get("comprehensiveUserInfo")
    this.userIdB = queryParams.get("userIdB")

    this.comprehensiveUserInfoDataObj = JSON.parse(comprehensiveUserInfoDataJSON)

    console.log(this.comprehensiveUserInfoDataObj, this.userIdB, this.props)
  }

  componentDidMount(){
    this.loadData()
  }

  async loadData(){
    console.log(this.props.match.params.userId)
    let response = await fetch(`${process.env.ROOT}/operations/paginated-messages/${this.props.match.params.userId}?page=${this.state.page}&limit=${this.state.limit}&userIdB=${this.userIdB}`)

    console.log(response)
  }


  // TODO comprehensiveUserInfo is using the password in the object need to get rid of that
  render(){
    return (
      <div >CRUDMessages...Based on the urserId and userId B pull in the conversation between both protagonists</div>
    )
  }
}

export default CRUDMessages