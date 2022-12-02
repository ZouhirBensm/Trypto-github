class EditChainWalletInformation extends React.Component {
  render(){
    return (
      <React.Fragment>
        <div>EditChainWalletInformation...</div>
        <button onClick={(e)=>{
          this.props.handleToogleEdit(undefined)
        }}>Revert</button>
      </React.Fragment>
    )
  }
}

export default EditChainWalletInformation