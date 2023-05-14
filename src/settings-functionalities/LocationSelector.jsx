import Map from './map-items/Map'
import Autocomplete from './map-items/Autocomplete'
import DragableMarker from './map-items/DragableMarker'
import CenterMap from './map-items/CenterMap'

import './styles/LocationSelector.css'


class LocationSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // console.log(this.props)
  }

  render() {
    return (
      <React.Fragment>
        <Autocomplete
          lat={this.props.lat}
          lng={this.props.lng}
          locationGeometryinSetAssociatedLocality={this.props.locationGeometryinSetAssociatedLocality}
          setpopup={this.props.setpopup}
        />

        <Map />

        <DragableMarker
          lat={this.props.lat}
          lng={this.props.lng}
          selectedUser={this.props.selectedUser}
          locationGeometryinSetAssociatedLocality={this.props.locationGeometryinSetAssociatedLocality}
          setpopup={this.props.setpopup}
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