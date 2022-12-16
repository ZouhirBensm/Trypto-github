import CitySelector from './CitySelector'

class StateProvinceSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <React.Fragment>
        <label htmlFor="state-province-select">State/Province</label>
        <select className="location-class" name="state-province" id="state-province-select" defaultValue={this.props.stateProvinceTerm}>
          <option value="">N/A</option>
          {this.props.options}
        </select> <br />

        <CitySelector
          stateProvinceTerm={this.props.stateProvinceTerm}
        />
        <br />
      </React.Fragment>
    )
  }
}

export default StateProvinceSelector