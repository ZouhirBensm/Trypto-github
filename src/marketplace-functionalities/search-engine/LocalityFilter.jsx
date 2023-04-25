
import StateProvinceSelector from './StateProvinceSelector'


class LocalityFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.setProvinceOrState = this.setProvinceOrState.bind(this)
  }

  shouldComponentUpdate(prevProps){
    if(prevProps.countryTerm != this.props.countryTerm || prevProps.stateProvinceTerm != this.props.stateProvinceTerm || prevProps.cityTerm != this.props.cityTerm) {return true}
    else {return false}
  }


  setProvinceOrState() {
    let options
    let tag_options_arr_data = []
    let selector

    if (this.props.countryTerm == "Canada") {
      tag_options_arr_data = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Québec", "Saskatchewan", "Yukon"]

      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);

    }
    else if (this.props.countryTerm == "United States") {
      tag_options_arr_data = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "Ohio", "Oklahoma", "Oregon", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "Wisconsin", "Wyoming", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "West Virginia", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota"]

      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }


    selector = <StateProvinceSelector
      options={options}
      stateProvinceTerm={this.props.stateProvinceTerm}
      cityTerm={this.props.cityTerm}
    />

    return selector
  }



  render() {
    const selector = this.setProvinceOrState()
    console.log(selector)

    return (
      <React.Fragment>
        <select className='picker' name="country" id="country-select" defaultValue={this.props.countryTerm}>
          <option value="">Country</option>
          <option value="Canada">Canada</option>
          <option value="United States">United States</option>
        </select> <br />


        {selector}
      </React.Fragment>
    )
  }
}

export default LocalityFilter