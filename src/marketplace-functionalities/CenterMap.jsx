



class CenterMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    // console.log("(3)", window.map)

    console.log("interet", this.props.newLocation)
    
  }


  
  componentDidUpdate(prevProp){
    console.log("old new location", prevProp.newLocation)
    console.log("new new location", this.props.newLocation)

    if(this.props.newLocation.lat===prevProp.newLocation.lat && this.props.newLocation.lng===prevProp.newLocation.lng){
      console.log("Don't recenter map")
    }else{
      this.reCenterMap()
    }
    
    // let map = window.map

    // map.setCenter(new google.maps.LatLng(this.props.newLocation.lng, this.props.newLocation.lat));
  }

  reCenterMap(){
    console.log("centering map!")

    
    let map = window.map
    console.log(this.props.newLocation, map)

    var latlng = new google.maps.LatLng(parseFloat(this.props.newLocation.lat), parseFloat(this.props.newLocation.lng));
    
    map.setCenter(latlng);

    // map.setCenter(new google.maps.LatLng(this.props.newLocation.lng,this.props.newLocation.lat));


  }



  render(){
    return (
      <React.Fragment>
        CenterMap

      </React.Fragment>
    )
  }
}

export default CenterMap


