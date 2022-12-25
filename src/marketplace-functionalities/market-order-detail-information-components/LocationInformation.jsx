class LocationInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    // TODO !!!!! If a prop field is undefined, skip/ do not render the div
    return (
      <React.Fragment>
        <div>LocationInformation...</div>
        <div>Street: {this.props.st}</div>
        <div>Neighbourhood: {this.props.neigh}</div>
        <div>City: {this.props.city}</div>
        <div>Province/State: {this.props.province_state}</div>
        <div>Country: {this.props.country}</div>
      </React.Fragment>
    )
  }
}

export default LocationInformation