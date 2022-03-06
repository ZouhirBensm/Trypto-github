import React from 'react';
import ReactDOM from 'react-dom'
import PricesComponent from './AppDep/PricesComponent.jsx';

class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      prices: []
    }
    this.repairData = this.repairData.bind(this)
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

  componentDidMount(){
    //DOM is ready
    this.loadData()
  }
  
  async loadData(){
    let objPrices = {}
    const response = await fetch(`${process.env.ROOT}/api`)
    const data = await response.json()
    objPrices = this.repairData(data)

    this.setState({
      prices: objPrices
    })
      
  }
    
  render() {
    //console.log("session: ", document.cookie)
    //console.log(this.state.prices)
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
    
    return (
      <React.Fragment> 
        {/* <p>{process.env.REACT_APP_DOMAIN}</p> */}
        <PricesComponent countries={countries.west} prices={this.state.prices}/>
        {/* <PricesComponent countries={countries.third}/> */}
        
      </React.Fragment> 
    );
  }
}

const element = <Home />;

ReactDOM.render(element, document.getElementById('contents'));