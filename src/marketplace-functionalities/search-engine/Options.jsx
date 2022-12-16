

class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  placeCities(ARR_cities){
    let options
    let tag_options_arr_data = ARR_cities
    
    options = tag_options_arr_data?.map((el, i) => <option key={i} value={el}>{el}</option>);

    return options
  }


  render() {
    let options = this.placeCities(this.props.ARR_cities)
    return (
      <React.Fragment>
        {options}
      </React.Fragment>
    )
  }
}

export default Options