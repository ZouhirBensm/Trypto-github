

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
      </React.Fragment>
    )
  }
}

export default OrderNumbersInformation