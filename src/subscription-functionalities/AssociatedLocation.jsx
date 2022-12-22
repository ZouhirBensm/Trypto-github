class AssociatedLocation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    this.retrieveAndSetCoords = this.retrieveAndSetCoords.bind(this)
  }

  componentDidMount(){
    if (this.props.lat && this.props.lng) {
      // TODO !!!! setup Pop ups/ or display state in UI with a design?
      console.log("Coordinates set")
    } else {
      console.log("Coordinates not set")
    }
  }

  componentDidUpdate(){
    if (this.props.lat && this.props.lng) {
      // Pop ups
      console.log("Coordinates set")
    }else {
      console.log("Coordinates not set, browser deblock to enable location request.")
    }
  }

  async retrieveAndSetCoords() {
    return new Promise(function(resolve, reject) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve([position.coords.latitude, position.coords.longitude])
        }, (error) => {
          // Client refuses
          reject(undefined)
        });
      } else {  
        // No API
        return(undefined)
      };
    });
  }

  render(){
    return (
      <React.Fragment>
        <button onClick={async (e)=>{
          let ret_retrieveAndSetCoords
          try {
            ret_retrieveAndSetCoords = await this.retrieveAndSetCoords()
          } catch (error) {
            console.log("error-->", error)
          }

          console.log("ret_retrieveAndSetCoords--->", ret_retrieveAndSetCoords)

          if (ret_retrieveAndSetCoords) {
            this.props.setLocality(ret_retrieveAndSetCoords[0], ret_retrieveAndSetCoords[1], e)
            this.props.setStateStep(3)
          }
          else {
            this.props.setLocality(ret_retrieveAndSetCoords, ret_retrieveAndSetCoords, e)
          }

        }}>Enable browser location (optional): For BidBlock to display relevant Market Orders.</button>

        <button onClick={(e) => this.props.setStateStep(1)}> Previous </button>
        <button onClick={(e) => this.props.setStateStep(3)}> Proceed </button>
      </React.Fragment>
    )
  }
}

export default AssociatedLocation