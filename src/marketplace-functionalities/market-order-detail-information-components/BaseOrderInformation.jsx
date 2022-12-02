

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
        <div>Posted Date: {this.props.postedDate}</div>
        <div>Expiration | {this.props.expirationAt} | {this.props.expirationDate} | {this.props.expirationTime}</div>
        <button onClick={(e)=>{
          this.props.handleToogleEdit("BaseOrderInformation")
        }}>Edit</button>
      </React.Fragment>
    )
  }
}

export default BaseOrderInformation