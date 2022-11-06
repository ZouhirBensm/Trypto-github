let marker



class DragableMarker2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.setMarker()
  }


  
  componentDidUpdate(prevProp){

    if(this.props.newLocation.lat===prevProp.newLocation.lat && this.props.newLocation.lng===prevProp.newLocation.lng){
    }else{
      this.setNewMarker()
    }
  }

  setNewMarker(){
    let lat, lng
    if(this.props.newLocation.lat==undefined || this.props.newLocation.lng==undefined) {
      lat = 45.41
      lng = -75.70
    } else {
      lat = this.props.newLocation.lat
      lng = this.props.newLocation.lng
    }

    marker?.setPosition({
      lat: lat, 
      lng: lng
    })


  }

  setMarker(){
    let map = window.map

    let lat, lng
    if(this.props.newLocation.lat==undefined || this.props.newLocation.lng==undefined) {
      lat = 45.41
      lng = -75.70
    } else {
      lat = this.props.newLocation.lat
      lng = this.props.newLocation.lng
    }
    
    marker =new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map,
      title: "Hello World!",
      draggable:true,
    });

    marker.addListener("dragend", () => {
      this.props.changeStateLocationParent({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
      })
    });

  }



  render(){
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
}

export default DragableMarker2


