
import LocationSelector from './LocationSelector'
import { withRouter } from 'react-router-dom';

class SetAssociatedLocality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: this.props.selectedUser.userassociatedlocalityID?.geometry.lat,
      lng: this.props.selectedUser.userassociatedlocalityID?.geometry.lng
    }


    this.locationGeometryinSetAssociatedLocality = this.locationGeometryinSetAssociatedLocality.bind(this)
    this.goBack = this.goBack.bind(this)
    
    this.markerListener = this.markerListener.bind(this)

    // console.log(`SetAssociatedLocality: constructor()-> this.props: ${this.props.userID_toWorkWith}`)
    // console.log(this.props.selectedUser)
  }

  componentWillUnmount() {
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    the_map.style.display = "none"
    autocomplete_block.style.display = "none"

    google.maps.event.clearListeners(window.marker, 'dragend');


  }

  markerListener() {
    this.locationGeometryinSetAssociatedLocality( window.marker.getPosition().lat(), window.marker.getPosition().lng() )
  }


  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    console.log(this.props)
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    the_map.style.display = "block"
    autocomplete_block.style.display = "block"

    window.marker.addListener("dragend", this.markerListener);
  }

  locationGeometryinSetAssociatedLocality(newlat, newlng) {
    this.setState({
      lat: newlat,
      lng: newlng,
    })
  }



  // When user edits the locality, through the pin or autocomplete
  // Update the master components location state
  // pass the state to the child Submit component and on every submit edit tge associated locality on the backend

  render() {
    return (
      <React.Fragment>
        <div>SetAssociatedLocality...</div>
        <LocationSelector
          lat={this.state.lat}
          lng={this.state.lng}
          locationGeometryinSetAssociatedLocality={this.locationGeometryinSetAssociatedLocality}
        />
        <button type="button" onClick={this.goBack}>
          Go back
        </button>
      </React.Fragment>
    )
  }
}

export default withRouter(SetAssociatedLocality)