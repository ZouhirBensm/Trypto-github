import OptionsSetting from './OptionsSetting'

class CitySelector extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){

    // console.log("--->>>>", this.props.cityTerm)
    return (
      <React.Fragment>
        {/* <label htmlFor="city-select">City</label> */}
        <select className="location-class picker" name="city" id="city-select">
          <option value="">City</option>
          <OptionsSetting
            stateProvinceTerm={this.props.stateProvinceTerm}
            cityTerm={this.props.cityTerm}
          />
        </select>

        <br />
      </React.Fragment>
    )
  }
}

export default CitySelector