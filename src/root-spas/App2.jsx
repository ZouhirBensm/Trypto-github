import PricesComponent from '../home-functionalities/PricesComponent.jsx';

// require('react-dom');
// window.React2 = require('react');
// console.log("same---->>>", window.React1 === window.React2);
// console.log(window.React1)
// console.log(window.React2)


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      prices: []
    }
    this.repairData = this.repairData.bind(this)
  }
  componentDidMount(){
    console.log("in component: ", userId)
    this.loadData()
  }
  
  async loadData(){
    let objPrices = {}
    const response = await fetch(`/cryptoprice`)
    const data = await response.json()
    objPrices = this.repairData(data)

    this.setState({
      prices: objPrices
    })
      
  }
    
  render() {
    let countries = {
      west: {
        one: "Canada",
        two: "USA",
        three: "EU"
      },
      third:{
        one: "Algeria",
        two: "Tunisia",
        three: "Morocco"
      }
    }
    
    console.log(countries.west, this.state.prices)
    return (
    
      <React.Fragment>
        <PricesComponent countries={countries.west} prices={this.state.prices}/>
        

      </React.Fragment> 
      
    );
  }

  repairData(_objPrices){
    let wahad
    let zouj
    let _repairedData = []
    wahad = _objPrices.data
    zouj = Object.getOwnPropertyNames(wahad)
    _repairedData = Object.values(wahad)
    for (let i=0; i<zouj.length; i++){
      _repairedData[i].name = zouj[i]
    }
    return _repairedData
  }


}

const element = <App />;


ReactDOM.render(element, document.getElementById('react-div'));


export default App

