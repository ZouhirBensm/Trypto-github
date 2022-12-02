

class ChainWalletInformation extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    console.log(this.props)
    return (
      <React.Fragment>
        <div>ChainWalletInformation...</div>
        <div>Chain: {this.props.chain}</div>
        <div>Payment: {this.props.payment}</div>
      </React.Fragment>
    )
  }
}

export default ChainWalletInformation