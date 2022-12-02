

class OrderNumbersInformation extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    console.log(this.props)
    return (
      <React.Fragment>
        <div>OrderNumbersInformation...</div>
        <div>Conversion: {this.props.conversion}</div>
        <div>Price: {this.props.price}</div>
        <button onClick={(e)=>{
          this.props.handleToogleEdit("OrderNumbersInformation")
        }}>Edit</button>
      </React.Fragment>
    )
  }
}

export default OrderNumbersInformation