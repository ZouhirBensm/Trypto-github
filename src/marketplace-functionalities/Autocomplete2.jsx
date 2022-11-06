let autocomplete

class Autocomplete2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.onPlacedChanged = this.onPlacedChanged.bind(this)
  }

  componentDidUpdate(prevProp){
    if(this.props.newLocation.lat===prevProp.newLocation.lat && this.props.newLocation.lng===prevProp.newLocation.lng){
    } else{
      this.updateInputField()
    }
  }



  async updateInputField(){
    let geocoder = new google.maps.Geocoder()

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
      document.getElementById("autocomplete-select").value = response.results[0].formatted_address;
    } else {
      window.alert("No results found");
    }
  }


  componentDidMount(){
    let options = {
      componentRestrictions: { country: ["us", "ca"] },
      fields: ["geometry"],
      strictBounds: false,
      types: ["address"],
      position: { lat: 45.41, lng: -75.70 },
    };

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete-select"), options);

    autocomplete.addListener('place_changed', this.onPlacedChanged)
  }


  onPlacedChanged(){
    var place = autocomplete.getPlace()
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
        <input id="autocomplete-select" type="text" name="autocomplete" required/><span>📍 is DRAG-ABLE!</span>
        <br id="location-dom-identifier"/>
      </React.Fragment>
    )
  }
}

export default Autocomplete2


