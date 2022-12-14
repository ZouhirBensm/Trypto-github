
class CitySelector extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    return (
      <React.Fragment>
        <label htmlFor="city-select">City</label>
        <select className="location-class" name="city" id="city-select" defaultValue={this.props.cityTerm}>
          <option value="" defaultValue>N/A</option>
          {this.props.options}
        </select>

        <br />
      </React.Fragment>
    )
  }
}

export default CitySelector