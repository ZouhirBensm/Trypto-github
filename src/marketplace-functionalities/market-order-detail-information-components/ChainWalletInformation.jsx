class ChainWalletInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <div>ChainWalletInformation...</div>
        <div>Chain: {this.props.chain}</div>
        <div>Payment: {this.props.payment}</div>


        {this.props.isSuperUser ?
          <button onClick={(e) => {
            this.props.handleToogleEdit("ChainWalletInformation")
          }}>Edit</button>
          :
          null
        }

      </React.Fragment>
    )
  }
}

export default ChainWalletInformation