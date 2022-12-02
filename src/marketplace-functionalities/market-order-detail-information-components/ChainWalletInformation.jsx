

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
        <button onClick={(e)=>{
          this.props.handleToogleEdit("ChainWalletInformation")
        }}>Edit</button>
      </React.Fragment>
    )
  }
}

export default ChainWalletInformation