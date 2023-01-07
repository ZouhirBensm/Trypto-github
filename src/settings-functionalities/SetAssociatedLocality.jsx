import Settings from '../root-spas/Settings'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';

class SetAssociatedLocality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: this.props.selectedUser.userassociatedlocalityID?.geometry.lat,
      lng: this.props.selectedUser.userassociatedlocalityID?.geometry.lng
    }

    console.log(`SetAssociatedLocality: constructor()-> this.props: ${this.props.userID_toWorkWith}`)
    console.log(this.props.selectedUser)
  }

  componentDidMount(){
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    the_map.style.display = "block"
    autocomplete_block.style.display = "block"
  }





  // render a google maps elements
  // center to state locality, with a pin on it


  // render a google maps elements
  // Have the map and pin centered in Ottawa


  // When user edits the locality, through the pin or autocomplete
  // Update the master components location state
  // pass the state to the child Submit component and on every submit edit tge associated locality on the backend

  render() {
    return (
      <React.Fragment>
        <div>SetAssociatedLocality...</div>


        <BrowserRouter>
          <Link to='/settings'>Back</Link> <br />
          <a href="/settings">Back</a>

          <Switch>

            {/* <Route path="/settings" render={
              (props) => <Settings {...props}
              />
            } /> */}

          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default SetAssociatedLocality