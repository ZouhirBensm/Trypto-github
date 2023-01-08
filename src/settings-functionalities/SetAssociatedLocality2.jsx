
import LocationSelector from './LocationSelector'
import SubmitNewAssociatedLocality from './SubmitNewAssociatedLocality'

import { withRouter } from 'react-router-dom';

class SetAssociatedLocality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: undefined,
      lng: undefined,
      popup: undefined
    }


    this.locationGeometryinSetAssociatedLocality = this.locationGeometryinSetAssociatedLocality.bind(this)
    this.goBack = this.goBack.bind(this)
    this.setpopup = this.setpopup.bind(this)

    // console.log(`SetAssociatedLocality: constructor()-> this.props: ${this.props.userID_toWorkWith}`)
    // console.log(this.props.selectedUser)
  }

  setpopup(popup) {
    this.setState({
      popup: popup
    })
  }

  componentWillUnmount() {
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    the_map.style.display = "none"
    autocomplete_block.style.display = "none"

    console.log("unmounting!")

  }


  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    console.log(this.props)
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    the_map.style.display = "block"
    autocomplete_block.style.display = "block"
  }

  locationGeometryinSetAssociatedLocality(newlat, newlng) {
    this.setState({
      lat: newlat,
      lng: newlng,
    })
  }

  render() {
    return (
      <React.Fragment>
        <LocationSelector
          lat={this.state.lat}
          lng={this.state.lng}
          selectedUser={this.props.selectedUser}
          locationGeometryinSetAssociatedLocality={this.locationGeometryinSetAssociatedLocality}
          setpopup={this.setpopup}
        />

        {this.state.popup ?
          <p>{this.state.popup}</p>
          : null}


        <button type="button" onClick={this.goBack}>
          Go back
        </button>

        <SubmitNewAssociatedLocality
          lat={this.state.lat}
          lng={this.state.lng}
          userID_toWorkWith={this.props.userID_toWorkWith}
          setpopup={this.setpopup}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(SetAssociatedLocality)