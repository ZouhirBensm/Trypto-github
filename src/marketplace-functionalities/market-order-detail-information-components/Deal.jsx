

class Deal extends React.Component {
  constructor(props){
    super(props)
  }


  goToChat(e) {
    e.preventDefault()
    window.location.href = `/messaging?orderId=${this.props.orderID}&userIdB=${this.props.order_owner_id}`
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={(e) => {
          this.goToChat(e)
        }}>Deal</button>
      </React.Fragment>
    )
  }
}

export default Deal