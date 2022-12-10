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

  // setStateProvinceSelector(_country) {
  //   let options
  //   let tag_options_arr_data = []
  //   let selector

  //   if (_country == "Canada") {
  //     tag_options_arr_data = ["Ontario", "Quebec", "Alberta"]
  //     options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
  //     selector = <React.Fragment>
  //       <label htmlFor="province-select">Province</label>
  //       <select value={this.state.value} onChange={this.change} className="location-class" name="province" id="province-select" required>
  //         <option value="" defaultValue>N/A</option>
  //         {options}
  //       </select> <br />


  //     </React.Fragment>
  //   }
  //   else if (_country == "United States") {
  //     tag_options_arr_data = ["Texas", "Florida", "California", "Colorado"]
  //     options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
  //     selector = <React.Fragment>
  //       <label htmlFor="state-select">State</label>
  //       <select value={this.state.value} onChange={this.change} className="location-class" name="state" id="state-select" required>
  //         <option value="" defaultValue>N/A</option>
  //         {options}
  //       </select> <br />

  //     </React.Fragment>
  //   }
  //   else { }

  //   return selector
  // }

  render() {
    // const AreaSelector = this.setStateProvinceSelector(this.state.country)

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