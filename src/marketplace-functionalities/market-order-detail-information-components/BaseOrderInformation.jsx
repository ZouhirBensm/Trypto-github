class BaseOrderInformation extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.getCondition = this.getCondition.bind(this)
  }

  getCondition(){
    let condition
    switch (this.props.condition) {
      case 1:
        condition =  "Brand new"
        break;
      case 2:
        condition = "Just opened"
        break;
      case 3:
        condition = "In good condition"
        break;
      case 4:
        condition = "Used"
        break;
        condition = undefined
      default:
        break;
    }

    return condition
  }

  render(){
    const condition = this.getCondition()
    return (
      <React.Fragment>
        <div>BaseOrderInformation...</div>
        <div>Title: {this.props.title}</div>
        <div>Description: {this.props.description}</div>
        <div>Category: {this.props.category}</div>
        <div>Condition: {condition}</div>
        <div>Posted Date: {this.props.postedDate}</div>
        <div>Expiration | {this.props.expirationAt} | {this.props.expirationDate} | {this.props.expirationTime}</div>


        {this.props.isSuperUser? 
          <button onClick={(e)=>{
            this.props.handleToogleEdit("BaseOrderInformation")
          }}>Edit</button>
        :
        null
        }
      </React.Fragment>
    )
  }
}

export default BaseOrderInformation