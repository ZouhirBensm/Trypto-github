

class ProvinceSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  setProvinceSelector(){
    console.log("ProvinceSelector->setProvinceSelector()->", this.props.country, this.props.province)

    let options
    let tag_options_arr_data = []
    let selector

    if (this.props.country == "Canada") {
      tag_options_arr_data = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"]

      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);

      selector = <React.Fragment>
        <label htmlFor="province-select">Province</label>
        <select value={this.props.province_state || ""} onChange={this.props.setProvinceOrState} className="location-class" name="province" id="province-select" required>
          <option value="" defaultValue>N/A</option>
          {options}
        </select> 
        <br />
      

      </React.Fragment>
    }
    else if (this.props.country == "United States") {
      tag_options_arr_data = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "MontanaNebraska", "Nevada", "Ohio", "Oklahoma", "Oregon", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "Wisconsin", "Wyoming", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "West Virginia", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota"]

      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
      selector = <React.Fragment>
        <label htmlFor="state-select">State</label>
        <select value={this.props.province_state|| ""} onChange={this.props.setProvinceOrState} className="location-class" name="state" id="state-select" required>
          <option value="" defaultValue>N/A</option>
          {options}
        </select>
         <br />
      </React.Fragment>
    }
    else { }

    return selector
  }


  render() {
    const component = this.setProvinceSelector()

    return (
      <React.Fragment>
        <p>ProvinceSelector</p>
        {component}
      </React.Fragment>
    )
  }
}

export default ProvinceSelector