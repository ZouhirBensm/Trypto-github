
class EditOrderUserInfomation extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <React.Fragment>
        <div>EditOrderUserInfomation...</div>
        <button onClick={(e)=>{
          this.props.handleToogleEdit(undefined)
        }}>Revert</button>
      </React.Fragment>
    )
  }
}

export default EditOrderUserInfomation