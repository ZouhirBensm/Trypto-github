import CitySelector from './CitySelector'


class StateProvinceSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.setCities = this.setCities.bind(this)
  }


  setCities() {
    let options
    let tag_options_arr_data = []
    let selector



    switch (this.props.stateProvinceTerm) {
      case "Alberta":
        tag_options_arr_data = ["City1", "City2", "City3"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "Nunavut":
        tag_options_arr_data = ["City4", "City5", "City6"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "Ontario":
        tag_options_arr_data = ["City7", "City8", "City9"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "Quebec":
        tag_options_arr_data = ["City10", "City11", "City12"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "Saskatchewan":
        tag_options_arr_data = ["City13", "City14", "City15"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "Yukon":
        tag_options_arr_data = ["City16", "City17", "City18"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "Manitoba":
        tag_options_arr_data = ["City19", "City20", "City21"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "British Columbia":
        tag_options_arr_data = ["City22", "City23", "City24"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "New Brunswick":
        tag_options_arr_data = ["City25", "City26", "City27"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "Northwest Territories":
        tag_options_arr_data = ["City28", "City29", "City30"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "Nova Scotia":
        tag_options_arr_data = ["City31", "City32", "City33"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "Newfoundland and Labrador":
        tag_options_arr_data = ["City34", "City35", "City36"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;
      case "Prince Edward Island":
        tag_options_arr_data = ["City37", "City38", "City39"]
        options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
        break;

      default:
        break;
    }

    

    selector = <CitySelector
      options={options}
      cityTerm={this.props.cityTerm}
    />

    return selector
  }

  render() {
    const selector = this.setCities()

    return (
      <React.Fragment>
        <label htmlFor="state-province-select">State/Province</label>
        <select className="location-class" name="state-province" id="state-province-select" defaultValue={this.props.stateProvinceTerm}>
          <option value="">N/A</option>
          {this.props.options}
        </select> <br/>

        {selector}
        <br />
      </React.Fragment>
    )
  }
}

export default StateProvinceSelector