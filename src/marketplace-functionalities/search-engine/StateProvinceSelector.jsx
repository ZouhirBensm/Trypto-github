import CitySelector from './CitySelector'

class StateProvinceSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <React.Fragment>
        {/* <label htmlFor="state-province-select">State/Province</label> */}
        <select className="location-class picker" name="state-province" id="state-province-select" defaultValue={this.props.stateProvinceTerm}>
          <option value="">State/Province</option>
          {this.props.options}
        </select> <br />

        <CitySelector
          stateProvinceTerm={this.props.stateProvinceTerm}
          cityTerm={this.props.cityTerm}
        />
        <br />
      </React.Fragment>
    )
  }
}

export default StateProvinceSelector