

class OrderUserInfomation extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    console.log(this.props)
    return (
      <React.Fragment>
        <div>OrderUserInfomation...</div>
        <div>User ID: {this.props.user_id}</div>
        <div>Username: {this.props.username}</div>
        <div>Email: {this.props.email}</div>
        <button onClick={(e)=>{
          this.props.handleToogleEdit("OrderUserInfomation")
        }}>Edit</button>
      </React.Fragment>
    )
  }
}

export default OrderUserInfomation