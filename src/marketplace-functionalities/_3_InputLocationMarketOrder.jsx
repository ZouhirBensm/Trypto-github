
// import '../style/reactDivMobile.css'

import LocationSelector2 from './LocationSelector2'


class _3_InputLocationMarketOrder extends React.Component {
  constructor(props){
    super(props)
    this.state={}

  }


  componentDidMount() {
    this.rePlaceMap()
  }

  rePlaceMap() {
    function insertAfter(newNode, existingNode) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }
    let br = document.getElementById('location-dom-identifier');
    let the_map = document.getElementById('the-map');
    insertAfter(the_map, br);
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
