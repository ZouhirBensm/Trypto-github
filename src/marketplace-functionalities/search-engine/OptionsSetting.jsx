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
      this.setCities().then((retrieved)=>{
        if (retrieved) console.log(retrieved)
      })
    }
  }

  componentDidMount(){
    this.setCities().then((retrieved)=>{
      if (retrieved) console.log(retrieved)
    })
  }


  async setCities() {
    if (!this.props.stateProvinceTerm){
      this.setState(({
        ARR_cities: undefined
      }))
      return
    }

    let response
    response = await fetch(`/marketplace/json/agglomerates?PR_TERR_ST=${this.props.stateProvinceTerm}`)

    console.log(response)


    
    if (response.status == 200 ) {
      let json
      json = await response.json()
      console.log(json)
      this.setState(({
        ARR_cities: json.ARR_cities
      }))
      return
    } else {
      let text
      text = await response.text()
      return text
    }

  }



  render() {
    // console.log("RERENDER")
    // let options = this.placeCities(this.state.ARR_cities)
    return (
      <React.Fragment>
        <Options
          ARR_cities={this.state.ARR_cities}
          cityTerm={this.props.cityTerm}
        />
      </React.Fragment>
    )
  }
}

export default OptionsSetting