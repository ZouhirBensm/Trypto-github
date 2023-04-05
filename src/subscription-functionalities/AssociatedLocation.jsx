import OnPageFooter from '../generic-components/OnPageFooter'
import './styles/AssociatedLocation.css'

class AssociatedLocation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location_set: false,
      notification: undefined,
    }
    this.retrieveAndSetCoords = this.retrieveAndSetCoords.bind(this)
  }

  componentDidMount() {

    if (this.props.lat && this.props.lng) {
      console.log("Coordinates set")
      this.setState({
        location_set: true,
      })

    } else {
      console.log("Coordinates not set")
      this.setState({
        location_set: false,
      })
    }
  }


  async retrieveAndSetCoords() {
    var msg_deblock_loc = `Currently your browser blocks location access. Go to browser settings to enable location for ${process.env.DOMAIN_WITHOUT_PROTOCOL}`

    var Componentthis = this
    return new Promise(function (resolve, reject) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          Componentthis.setState({
            location_set: true,
            notification: undefined,
          })
          resolve([position.coords.latitude, position.coords.longitude])
        }, (error) => {
          // Client refuses
          Componentthis.setState({
            location_set: false,
            notification: msg_deblock_loc,
          })
          reject(undefined)
        });
      } else {
        // No API
        Componentthis.setState({
          location_set: false,
        })
        return (undefined)
      };
    });
  }

  render() {
    return (
      <React.Fragment>

        <div id="location-set">
          <img src="/img/SVG/sub/step2/pin.svg" alt="" />
          <span>Location Set:</span>
          {this.state.location_set ?
            <img src="/img/SVG/sub/step2/app-check.png" alt="" />
            :
            <img src="/img/SVG/sub/step2/check.png" alt="" />
          }
        </div>

        <button onClick={async (e) => {
          let ret_retrieveAndSetCoords
          try {
            ret_retrieveAndSetCoords = await this.retrieveAndSetCoords()
          } catch (error) {
            console.log("error-->", error)
          }
          // console.log("ret_retrieveAndSetCoords--->", ret_retrieveAndSetCoords)

          if (ret_retrieveAndSetCoords) {
            this.props.setLocality(ret_retrieveAndSetCoords[0], ret_retrieveAndSetCoords[1], e)
            // this.props.setStateStep(3)
          }
          else {
            this.props.setLocality(ret_retrieveAndSetCoords, ret_retrieveAndSetCoords, e)
          }

        }}>Enable browser location (optional): For BidBlock to display relevant Market Orders.</button>



        {this.state.notification ?
          <div id="notif">{this.state.notification}</div>
          : null}



        <div id='pro-pre'>
          <img src="/img/SVG/sub/previous.svg" alt="" />
          <button onClick={(e) => this.props.setStateStep(1)}> Previous </button>
          <button onClick={(e) => this.props.setStateStep(3)}> Proceed </button>
          <img src="/img/SVG/sub/proceed.svg" alt="" />
        </div>

        <OnPageFooter/>
      </React.Fragment>
    )
  }
}

export default AssociatedLocation