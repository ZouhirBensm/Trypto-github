
class SetAssociatedLocality extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    console.log(`SetAssociatedLocality: constructor()-> this.props.userID_toWorkWith: ${this.props.userID_toWorkWith}`)
  }

  // Retrive the user location
  // If user has a associated locality
  // have the state update to that user locality
  // render a google maps centered in the center of that locality, with a pin on it

  // If user does not have a associated locality
  // Keep the state locality state undefined
  // Have the map and pin centered in Ottawa

  // When user edits the locality, through the pin or autocomplete
  // Update the master components location state
  // pass the state to the child Submit component and on every submit edit tge associated locality on the backend

  render(){
    return (
      <div>SetAssociatedLocality...</div>
    )
  }
}

export default SetAssociatedLocality