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
    let geocoder = window.geocoder

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

    let autocomplete = window.autocomplete
    autocomplete.addListener('place_changed', this.onPlacedChanged)
  }


  onPlacedChanged(){
    let autocomplete = window.autocomplete

    var place = autocomplete.getPlace()

    if(!place.geometry){
      document.getElementById("autocomplete").placeholder = "..."
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
        {/* <label htmlFor="autocomplete-select">Trade Location</label>
        <input id="autocomplete-select" type="text" name="autocomplete" required/><span>📍 is DRAG-ABLE!</span>
        <br id="location-dom-identifier"/> */}
      </React.Fragment>
    )
  }
}

export default Autocomplete2


