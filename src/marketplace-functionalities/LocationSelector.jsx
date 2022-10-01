import Autocomplete from './Autocomplete'
import Map from './Map'
import DragableMarker from './DragableMarker'
import CenterMap from './CenterMap'



class LocationSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      localLocation: undefined
    }
    // console.log("new location!!!!", this.props.newLocation)
  }

  // componentDidUpdate(prevProp){
  //   console.log("old new location", prevProp.newLocation)
  //   console.log("new new location", this.props.newLocation)
  //   // this.state.localLocation
  // }






  render() {
    console.log("render")
    return (
      <React.Fragment>
        <Autocomplete changeStateLocationParent={this.props.changeStateLocationParent} newLocation={this.props.newLocation}/>
        <Map/>
        <DragableMarker changeStateLocationParent={this.props.changeStateLocationParent} newLocation={this.props.newLocation}/>
        <CenterMap newLocation={this.props.newLocation}/>

        <div onClick={(e) => {
          this.props.changeStateLocationParent({
            lat: 1,
            lng: 1,
          })
        }}>LocationSelector...</div>

      </React.Fragment>
    )
  }
}

export default LocationSelector


