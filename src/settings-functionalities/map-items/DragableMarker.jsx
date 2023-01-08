
class DragableMarker extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.markerListener = this.markerListener.bind(this)
  }

  markerListener() {
    this.props.locationGeometryinSetAssociatedLocality( window.marker.getPosition().lat(), window.marker.getPosition().lng() )
  }

  componentDidMount(){
    window.marker.addListener("dragend", () => {
      this.props.locationGeometryinSetAssociatedLocality( marker.getPosition().lat(), marker.getPosition().lng() )
    });
  }

  componentWillUnmount(prevProps) {
    // const lat = parseFloat(this.props.selectedUser.userassociatedlocalityID?.geometry.lat) || 45.4
    // const lng = parseFloat(this.props.selectedUser.userassociatedlocalityID?.geometry.lng) || -75.7
    // const lat = parseFloat(prevProps.lat) || 45.4
    // const lng = parseFloat(prevProps.lat) || -75.7
    const lat = parseFloat(window.lat)
    const lng = parseFloat(window.lng)

    this.setMarker(lat, lng)

    google.maps.event.clearListeners(window.marker, 'dragend');
  }


  componentDidUpdate(prevProp){

    if ( this.props.lat == undefined || this.props.lng == undefined ) {
      return
    }

    if ( this.props.lat === prevProp.lat && this.props.lng === prevProp.lng ) {
    } else{
      // Set's the markers to the new position
      this.setMarker(this.props.lat, this.props.lng)
      return
    }
  }

  setMarker(lat, lng){
    window.marker?.setPosition({
      lat: lat, 
      lng: lng
    })
  }
  
  render(){
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
}

export default DragableMarker