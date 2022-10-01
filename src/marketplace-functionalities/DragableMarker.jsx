let marker



class DragableMarker extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    // console.log("(3)", window.map)

    console.log("interet", this.props.newLocation)
    this.setMarker()
  }


  
  componentDidUpdate(prevProp){
    console.log("old new location", prevProp.newLocation)
    console.log("new new location", this.props.newLocation)

    if(this.props.newLocation.lat===prevProp.newLocation.lat && this.props.newLocation.lng===prevProp.newLocation.lng){
      console.log("Don't recenter marker")
    }else{
      this.setNewMarker()
    }
    
    // let map = window.map

    // map.setCenter(new google.maps.LatLng(this.props.newLocation.lng, this.props.newLocation.lat));
  }

  setNewMarker(){
    console.log("centering marker!")

    marker.setPosition({
      lat: this.props.newLocation.lat, 
      lng: this.props.newLocation.lng
    })


  }

  setMarker(){
    console.log("setMarker")

    let map = window.map

    marker =new google.maps.Marker({
      position: { lat: this.props.newLocation.lat, lng: this.props.newLocation.lng },
      map,
      title: "Hello World!",
      draggable:true,
    });

    // console.log(marker)
    // console.log(this.props.changeStateLocationParent)

    marker.addListener("dragend", () => {
      // console.log("BAM!")
      // console.log(marker.getPosition().lat())
      // console.log(marker.getPosition().lng())
      this.props.changeStateLocationParent({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
      })
    });

  }



  render(){
    return (
      <React.Fragment>
        DragableMarker

      </React.Fragment>
    )
  }
}

export default DragableMarker


