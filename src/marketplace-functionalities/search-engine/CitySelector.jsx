import OptionsSetting from './OptionsSetting'

class CitySelector extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){

    return (
      <React.Fragment>
        <label htmlFor="city-select">City</label>
        <select className="location-class" name="city" id="city-select" >
          <option value="" defaultValue>N/A</option>
          <OptionsSetting
            stateProvinceTerm={this.props.stateProvinceTerm}
          />
        </select>

        <br />
      </React.Fragment>
    )
  }
}

export default CitySelector