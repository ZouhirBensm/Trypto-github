
// import '../style/reactDivMobile.css'

import LocationSelector2 from './LocationSelector2'


class _3_InputLocationMarketOrder extends React.Component {
  constructor(props){
    super(props)
    this.state={}

  }

  render() {

    // _____________________________________________

    return (
      <React.Fragment>

        <div className="make-container">
          <form className="form" id="form_id">

            <LocationSelector2
              changeStateLocationParent={this.props.changeStateLocationParent}
              newLocation={this.props.geometry}
            />

          </form><br />
        </div>



        <button onClick={(e) => {
          this.props.previousStep(e)
        }}>Previous</button>
        <button onClick={(e) => {
          this.props.nextStep(e)
        }}>Next</button>

      </React.Fragment>
    )
  }
  // _____________________________________________
}



export default _3_InputLocationMarketOrder
