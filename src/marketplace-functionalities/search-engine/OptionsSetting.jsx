import Options from './Options'

class OptionsSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ARR_cities: undefined
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.stateProvinceTerm !== this.props.stateProvinceTerm){
      this.setCities()
    }
  }


  async setCities() {

    let response
    response = await fetch(`/marketplace/json/agglomerates?PR_TERR_ST=${this.props.stateProvinceTerm}`)
    console.log(response)

    let json
    json = await response.json()

    this.setState(({
      ARR_cities: json.ARR_cities
    }))

  }



  render() {
    console.log("RERENDER")
    // let options = this.placeCities(this.state.ARR_cities)
    return (
      <React.Fragment>
        <Options
          ARR_cities={this.state.ARR_cities}
        />
      </React.Fragment>
    )
  }
}

export default OptionsSetting