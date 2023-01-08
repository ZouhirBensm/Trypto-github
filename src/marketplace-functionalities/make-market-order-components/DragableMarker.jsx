class DragableMarker extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    let marker = window.marker

    marker.addListener("dragend", () => {
      this.props.changeStateLocationParent({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
      })
    });
  }


  
  componentDidUpdate(prevProp){

    if(this.props.newLocation.lat == undefined || this.props.newLocation.lng == undefined){
      return
    }

    if(this.props.newLocation.lat===prevProp.newLocation.lat && this.props.newLocation.lng===prevProp.newLocation.lng){
    }else{
      this.setMarker()
    }
  }



  setMarker(){
    let marker = window.marker
    let lat, lng


    lat = this.props.newLocation.lat
    lng = this.props.newLocation.lng


    marker?.setPosition({
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


