

class CenterMap2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }


  
  componentDidUpdate(prevProp){
    if(this.props.newLocation.lat===prevProp.newLocation.lat && this.props.newLocation.lng===prevProp.newLocation.lng){
    } else{
      this.reCenterMap()
    }
  }

  reCenterMap(){
    let map = window.map

    var latlng = new google.maps.LatLng(parseFloat(this.props.newLocation.lat), parseFloat(this.props.newLocation.lng));
    
    map.setCenter(latlng);
  }



  render(){
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
}

export default CenterMap2


