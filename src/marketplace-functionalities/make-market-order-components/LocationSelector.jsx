import Map from './Map'
import Autocomplete from './Autocomplete'
import DragableMarker from './DragableMarker'
import CenterMap from './CenterMap'



class LocationSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    return (
      <React.Fragment>

        <Autocomplete
        changeStateLocationParent={this.props.changeStateLocationParent}
        resetLocation={this.props.resetLocation}
        newLocation={this.props.newLocation}
        setpopup={this.props.setpopup}
        />

        <Map/>

        <DragableMarker
        changeStateLocationParent={this.props.changeStateLocationParent} 
        newLocation={this.props.newLocation}
        />

        <CenterMap newLocation={this.props.newLocation}/>

      </React.Fragment>
    )
  }
}

export default LocationSelector


