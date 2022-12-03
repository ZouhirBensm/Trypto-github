

class BaseOrderInformation extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    console.log(this.props)
    return (
      <React.Fragment>
        <div>BaseOrderInformation...</div>
        <div>Title: {this.props.title}</div>
        <div>Description: {this.props.description}</div>
        <div>Category: {this.props.category}</div>
        <div>Condition: {this.props.condition}</div>
        <div>Posted Date: {this.props.postedDate}</div>
        <div>Expiration | {this.props.expirationAt} | {this.props.expirationDate} | {this.props.expirationTime}</div>

        {/* TODO HERE Accessable only if my order or master */}
        <button onClick={(e)=>{
          this.props.handleToogleEdit("BaseOrderInformation")
        }}>Edit</button>
      </React.Fragment>
    )
  }
}

export default BaseOrderInformation