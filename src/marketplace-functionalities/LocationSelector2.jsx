import Map2 from './Map2'
import Autocomplete2 from './Autocomplete2'
import DragableMarker2 from './DragableMarker2'
import CenterMap2 from './CenterMap2'



class LocationSelector2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      localLocation: undefined
    }
  }


  render() {
    return (
      <React.Fragment>

        <Autocomplete2 
        changeStateLocationParent={this.props.changeStateLocationParent} 
        newLocation={this.props.newLocation}
        />

        <Map2/>

        <DragableMarker2 
        changeStateLocationParent={this.props.changeStateLocationParent} 
        newLocation={this.props.newLocation}
        />

        <CenterMap2 newLocation={this.props.newLocation}/>

      </React.Fragment>
    )
  }
}

export default LocationSelector2


