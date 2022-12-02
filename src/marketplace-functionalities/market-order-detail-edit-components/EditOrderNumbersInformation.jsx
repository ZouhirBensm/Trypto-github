class EditOrderNumbersInformation extends React.Component {
  render(){
    return (
      <React.Fragment>
        <div>EditOrderNumbersInformation...</div>
        <button onClick={(e)=>{
          this.props.handleToogleEdit(undefined)
        }}>Revert</button>
      </React.Fragment>
    )
  }
}

export default EditOrderNumbersInformation