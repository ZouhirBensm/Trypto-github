class EditLocationInformation extends React.Component {
  render(){
    return (
      <React.Fragment>
        <div>EditLocationInformation...</div>
        <button onClick={(e)=>{
          this.props.handleToogleEdit(undefined)
        }}>Revert</button>
      </React.Fragment>
    )
  }
}

export default EditLocationInformation