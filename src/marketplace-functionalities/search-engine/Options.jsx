

class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: undefined
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ARR_cities !== this.props.ARR_cities) {
      this.placeCities(this.props.ARR_cities)
    }
  }

  componentDidMount() {
    this.placeCities(this.props.ARR_cities)
  }



  placeCities(ARR_cities) {
    let options
    let tag_options_arr_data = ARR_cities


    options = tag_options_arr_data?.map((el, i) => {
      if (el == this.props.cityTerm) {
        return <option key={i} value={el}>{el}</option>
      } else {
        return <option key={i} value={el}>{el}</option>
      }
    });

    this.setState({
      options: options
    }, ()=>{
      let citySelect = document.getElementById("city-select")
      citySelect.value = this.props.cityTerm || ""
    })


    return
  }


  render() {

    return (
      <React.Fragment>
        {this.state.options}
      </React.Fragment>
    )
  }
}

export default Options