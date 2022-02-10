
import React from 'react';
import ReactDOM from 'react-dom'
import PricesComponent from './AppDep/PricesComponent.jsx';


let objPrices = {}

function repairData(_objPrices){
  let wahad
  let zouj
  let _repairedData = []
  //Object.values
  //Object.getOwnPropertyNames
  wahad = _objPrices.data
  zouj = Object.getOwnPropertyNames(wahad)
  _repairedData = Object.values(wahad)

  for (let i=0; i<zouj.length; i++){
    _repairedData[i].name = zouj[i]
  }
  return _repairedData
}


class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      prices: []
    }
  }
  componentDidMount(){
    //DOM is ready
    this.loadData()
  }
  
  async loadData(){
    const response = await fetch(`http://localhost:3000/api`)
    //CORRECT WAY TO USE ASYNC/AWAIT. Got to fix others
    console.log("HEERRREEE", process.env.ROOT)
    const data = await response.json()
    objPrices = repairData(data)
    //OR
    // .then(res=>res.json())
    // .then(data=>{
      //   objPrices = repairData(data)
      // })
      
      //console.log('object working with: ', objPrices,'\n')
      //repairing data
      //let repairedData = repairData(objPrices)
      //console.log(typeof objPrices)
      
      
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