
import LocationSelector from './LocationSelector'
import SubmitNewAssociatedLocality from './SubmitNewAssociatedLocality'
import DoesUserHaveAssociatedLocalitySet from './DoesUserHaveAssociatedLocalitySet'


import { withRouter } from 'react-router-dom';



class SetAssociatedLocality extends React.Component {
  constructor(props) {
    super(props)
    const queryParams = new URLSearchParams(this.props.location.search)
    const popup = queryParams.get("popup")

    this.state = {
      lat: undefined,
      lng: undefined,
      popup: undefined || popup
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
    // console.log(this.props)
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

        <div id='setting-header-location'>
          <img src="" alt="" />
          <h2>Location</h2>
          <hr />
        </div>



        <DoesUserHaveAssociatedLocalitySet
          selectedUser={this.props.selectedUser}
        />



        <LocationSelector
          lat={this.state.lat}
          lng={this.state.lng}
          selectedUser={this.props.selectedUser}
          locationGeometryinSetAssociatedLocality={this.locationGeometryinSetAssociatedLocality}
          setpopup={this.setpopup}
        />











        {this.state.popup ?
          <span id='popup'>{this.state.popup}</span>
          : null}


        <br /><br />
        <div id='locality-settings-buttons'>
          <button type="button" onClick={this.goBack}>
            Go back
          </button>


          <SubmitNewAssociatedLocality
            lat={this.state.lat}
            lng={this.state.lng}
            selectedUser={this.props.selectedUser}
            userID_toWorkWith={this.props.userID_toWorkWith}
            setpopup={this.setpopup}
          />
        </div>

      </React.Fragment>
    )
  }
}

export default withRouter(SetAssociatedLocality)