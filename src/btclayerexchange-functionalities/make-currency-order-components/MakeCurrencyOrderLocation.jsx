import ProvinceSelector from './ProvinceSelector'


class MakeCurrencyOrderLocation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      country: undefined,
      province_state: undefined,
    }
    this.locationChange = this.locationChange.bind(this)
    this.setProvinceOrState = this.setProvinceOrState.bind(this)
  }

  componentDidMount(){
    this.locationChange()
  }

  locationChange(e = null) {
    e?.preventDefault()
    let _country
    var country_sel = document.getElementById("form_id").elements["country"];
    _country = country_sel.options[country_sel.selectedIndex].text;

    this.setState({
      country: _country,
      province_state: undefined,
    })
  }

  setProvinceOrState(e){
    console.log(e.target.value)
    this.setState({
      province_state: e.target.value
    });
  }


  render() {

    return (
      <React.Fragment>

        <label htmlFor="country-select">Country</label>
        <select onChange={(e) => this.locationChange(e)} name="country" id="country-select" required>
          <option value="Canada" defaultValue>Canada</option>
          <option value="United States">United States</option>
        </select> <br />

        <ProvinceSelector
          country={this.state.country}
          province_state={this.state.province_state}
          setProvinceOrState={this.setProvinceOrState}
        />
      </React.Fragment>
    )
  }
}

export default MakeCurrencyOrderLocation