import OptionsSetting from './OptionsSetting'

class CitySelector extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){

    console.log("--->>>>",this.props.cityTerm)
    return (
      <React.Fragment>
        <label htmlFor="city-select">City</label>
        <select className="location-class" name="city" id="city-select">
          <option value="">N/A</option>
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