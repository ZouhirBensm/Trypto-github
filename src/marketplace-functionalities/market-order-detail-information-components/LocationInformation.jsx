

class LocationInformation extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    console.log(this.props)
    return (
      <React.Fragment>
        <div>LocationInformation...</div>
        <div>Street: {this.props.st}</div>
        <div>Neighbourhood: {this.props.neigh}</div>
        <div>City: {this.props.city}</div>
        <div>Province/State: {this.props.province_state}</div>
        <div>Country: {this.props.country}</div>
        <button onClick={(e)=>{
          this.props.handleToogleEdit("LocationInformation")
        }}>Edit</button>
      </React.Fragment>
    )
  }
}

export default LocationInformation