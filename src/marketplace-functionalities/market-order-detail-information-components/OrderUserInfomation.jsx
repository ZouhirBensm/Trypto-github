import './style/OrderUserInfomation.css'


class OrderUserInfomation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <h2>Owner</h2>
        <div>{this.props.username}</div>
        {/* <div>User ID: {this.props.user_id}</div>
        <div>Email: {this.props.email}</div> */}
      </React.Fragment>
    )
  }
}

export default OrderUserInfomation