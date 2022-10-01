let autocomplete



class Autocomplete extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    // console.log("(1)", window.map)
    // console.log(this.props.changeStateLocationParent)
    this.onPlacedChanged = this.onPlacedChanged.bind(this)
  }

  componentDidUpdate(prevProp){
    console.log("old new location", prevProp.newLocation)
    console.log("new new location", this.props.newLocation)

    // console.log(this.props.newLocation.lat===prevProp.newLocation.lat && this.props.newLocation.lng===prevProp.newLocation.lng)



    if(this.props.newLocation.lat===prevProp.newLocation.lat && this.props.newLocation.lng===prevProp.newLocation.lng){
      console.log("Don't update Input field!")
    }else{
      this.updateInputField()
    }
    
  }



  async updateInputField(){
    console.log("Update Input field")

    let geocoder = new google.maps.Geocoder()
    // console.log("google.maps.Geocoder", geocoder)

    const latlng = {
      lat: parseFloat(this.props.newLocation.lat),
      lng: parseFloat(this.props.newLocation.lng),
    };

    let response
    try {
      response = await geocoder.geocode({ location: latlng })
    } catch (e) {
      console.error("Geocoder failed due to: " + e)
    }
  
    
    if (response.results[0]) {
      // console.log("Detailed address response from reverse geocoding", response.results)
      document.getElementById("autocomplete-select").value = response.results[0].formatted_address;

    } else {
      window.alert("No results found");
    }
  }


  componentDidMount(){
    
    

    let options = {
      componentRestrictions: { country: ["us", "ca"] },
      // "geometry", "icon", "name", "formatted_address"
      fields: ["geometry"],
      strictBounds: false,
      types: ["address"],
      position: { lat: 45.41, lng: -75.70 },
    };

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete-select"), options);

    autocomplete.addListener('place_changed', this.onPlacedChanged)
  }


  onPlacedChanged(){
    // console.log("place changed!!!!", autocomplete)

    // console.log("TTTHIIISSSS", this.props.changeStateLocationParent)

    var place = autocomplete.getPlace()

    // console.log(place.geometry)
    if(!place.geometry){
      document.getElementById("autocomplete").placeholder = "Enter a place"
    } else {
      this.props.changeStateLocationParent({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })

    }
  }


  render(){
    return (
      <React.Fragment>
        <label htmlFor="autocomplete-select">Trade Location</label>
        <input id="autocomplete-select" type="text" name="autocomplete" required/><br />
      </React.Fragment>
    )
  }
}

export default Autocomplete


