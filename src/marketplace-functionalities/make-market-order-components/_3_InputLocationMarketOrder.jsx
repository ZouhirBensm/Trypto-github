import { validate_location_geometry_inputs } from '../../../full-stack-libs/validations'
import LocationSelector from './LocationSelector'
import '../style/_3_InputLocationMarketOrder.css'


class _3_InputLocationMarketOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async validation() {
    let _2_InputNumbersMarketOrder_data = {
      geometry: this.props.geometry,
    }

    console.log(_2_InputNumbersMarketOrder_data)

    let error_msg_retrieved_if_any

    error_msg_retrieved_if_any = validate_location_geometry_inputs(_2_InputNumbersMarketOrder_data)

    console.log("_3_InputLocationMarketOrder: validation()-> error: ", error_msg_retrieved_if_any)

    if (error_msg_retrieved_if_any) {
      this.props.setpopup(error_msg_retrieved_if_any)
      return false
    } else { return true }

  }



  render() {



    return (
      <React.Fragment>

        <div className="make-container">
          <form className="form" id="form_id">

            <LocationSelector
              changeStateLocationParent={this.props.changeStateLocationParent}
              resetLocation={this.props.resetLocation}
              newLocation={this.props.geometry}
              setpopup={this.props.setpopup}
            />

          </form>
        </div>

        <div id='proceed'>
          <img src="/img/SVG/sub/previous.svg" alt=""></img>
          <button onClick={(e) => {
            this.props.previousStep(e)
          }}>Previous</button>

          <button onClick={async (e) => {
            let ret_validation = await this.validation()
            if (ret_validation) {
              return this.props.nextStep(e)
            } else {
              return
            }
          }}>Proceed</button>
          <img src="/img/SVG/sub/proceed.svg" alt=""></img>
        </div>

      </React.Fragment>
    )
  }

}



export default _3_InputLocationMarketOrder
