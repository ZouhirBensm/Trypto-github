// import React, {lazy, Suspense} from 'react';
// import ReactDOM from 'react-dom'
import PricesComponent from '../home-functionalities/PricesComponent.jsx';

import Register from '../login-register-functionalities/Register.jsx';
import Subscription from './Subscription'


// TODO #97 Put root files in src in their own folder, adjust webpack configs accordingly. Name the folder: "root SPAs"

// let PricesComponent = lazy(()=>{ return import('./home-functionalities/PricesComponent.jsx')})

require('react-dom');
window.React2 = require('react');
console.log("same---->>>", window.React1 === window.React2);
console.log(window.React1)
console.log(window.React2)


class App extends React.Component {
  constructor(props){
    super(props)
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
    console.log("in component: ", userId)
    //DOM is ready
    this.loadData()
    
    // const pricesComponent = document.getElementsByClassName("prices")[0]
    // const registerComponent = document.getElementById("container-log-reg")

    // registerComponent.insertBefore(pricesComponent, registerComponent.firstChild);
  }
  
  async loadData(){
    // TODO uncomment all the loadData code, commented to avoid error temporarily
    let objPrices = {}
    const response = await fetch(`/cryptoprice`)
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
    
    console.log(countries.west, this.state.prices)
    return (
    
      <React.Fragment>
        <PricesComponent countries={countries.west} prices={this.state.prices}/>
        

      </React.Fragment> 
      
    );
  }
}

const element = <App />;


ReactDOM.render(element, document.getElementById('react-div'));


export default App

