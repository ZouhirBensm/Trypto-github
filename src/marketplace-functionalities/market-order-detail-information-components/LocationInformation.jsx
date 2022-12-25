class LocationInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <div>LocationInformation...</div>
        {this.props.st && <div>Street: {this.props.st}</div>}
        {this.props.neigh && <div>Neighbourhood: {this.props.neigh}</div>}        
        {this.props.city && <div>City: {this.props.city}</div>}
        {this.props.province_state && <div>Political Area: {this.props.province_state}</div>}
        {this.props.country && <div>Country: {this.props.country}</div>}
      </React.Fragment>
    )
  }
}

export default LocationInformation