class CenterMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentWillUnmount(prevProps){
    // const lat = parseFloat(this.props.selectedUser.userassociatedlocalityID?.geometry.lat) || 45.4
    // const lng = parseFloat(this.props.selectedUser.userassociatedlocalityID?.geometry.lng) || -75.7
    // const lat = parseFloat(prevProps.lat) || 45.4
    // const lng = parseFloat(prevProps.lat) || -75.7
    const lat = parseFloat(window.lat)
    const lng = parseFloat(window.lng)

    this.reCenterMap(lat, lng)
  }


  componentDidUpdate(prevProp){

    if( this.props.lat == undefined || this.props.lng == undefined ){
      return
    }

    if( this.props.lat === prevProp.lat && this.props.lng === prevProp.lng ){
    } else{
      // Center's Map to the new position
      this.reCenterMap(parseFloat(this.props.lat), parseFloat(this.props.lng))
    }
  }



  reCenterMap(lat, lng){
    var latlng = new google.maps.LatLng(lat, lng);
    
    window.map.setCenter(latlng);

  }
  
  render(){
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
}

export default CenterMap