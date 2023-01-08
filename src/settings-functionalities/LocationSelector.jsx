import Map from './map-items/Map'
import Autocomplete from './map-items/Autocomplete'
import DragableMarker from './map-items/DragableMarker'
import CenterMap from './map-items/CenterMap'


class LocationSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(this.props)
  }


  render() {
    return (
      <React.Fragment>
        <Autocomplete
        />

        <Map />

        <DragableMarker
          lat={this.props.lat}
          lng={this.props.lng}
          selectedUser={this.props.selectedUser}
          locationGeometryinSetAssociatedLocality={this.props.locationGeometryinSetAssociatedLocality}
        />

        <CenterMap
          lat={this.props.lat}
          lng={this.props.lng}
          selectedUser={this.props.selectedUser}
        />
      </React.Fragment>
    )
  }
}

export default LocationSelector