import './styles/Autocomplete.css'


class Autocomplete extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.autoCompleteListener = this.autoCompleteListener.bind(this)
  }

  componentDidMount(){
    window.autocomplete.addListener('place_changed', this.autoCompleteListener)
  }

  autoCompleteListener(){
    var place = window.autocomplete.getPlace()

    if(!place.geometry){
      return
    } else {
      this.props.setpopup(undefined)
      this.props.locationGeometryinSetAssociatedLocality(place.geometry.location.lat(), place.geometry.location.lng())
    }
  }
  
  render(){
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }

  componentDidUpdate(prevProp){
    if(this.props.lat == undefined || this.props.lng == undefined){
      console.log("componentDidUpdate(): undefined lat and lng")
      return
    }
    if(this.props.lat===prevProp.lat && this.props.lng===prevProp.lng){
    } else{
      return this.updateInputField(this.props.lat, this.props.lng)
    }
  }

  async updateInputField(lat, lng){
    const latlng = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    let response
    try {
      response = await window.geocoder.geocode({ location: latlng })
    } catch (e) {
      console.error("Geocoder failed due to: " + e)
    }
  
    
    if (response.results[0]) {
      document.getElementById("autocomplete-select").value = response.results[0].formatted_address;
    } else {
      window.alert("No results found");
    }
  }

  componentWillUnmount(prevProps) {
    // const lat = parseFloat(this.props.selectedUser.userassociatedlocalityID?.geometry.lat) || 45.4
    // const lng = parseFloat(this.props.selectedUser.userassociatedlocalityID?.geometry.lng) || -75.7
    // const lat = parseFloat(prevProps.lat) || 45.4
    // const lng = parseFloat(prevProps.lat) || -75.7

    // const lat = parseFloat(window.lat)
    // const lng = parseFloat(window.lng)
    // this.updateInputField(lat, lng)
    
    document.getElementById("autocomplete-select").value = "";

    google.maps.event.clearListeners(window.autocomplete, 'place_changed');
  }

}

export default Autocomplete