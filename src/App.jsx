// import React, {lazy, Suspense} from 'react';
// import ReactDOM from 'react-dom'
import PricesComponent from './home-functionalities/PricesComponent.jsx';


// TODO #97 Put root files in src in their own folder, adjust webpack configs accordingly. Name the folder: "root SPAs"

// let PricesComponent = lazy(()=>{ return import('./home-functionalities/PricesComponent.jsx')})

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
    //DOM is ready
    this.loadData()
  }
  
  async loadData(){
    let objPrices = {}
    const response = await fetch(`${process.env.ROOT}/cryptoprice`)
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
        {/* <p>{process.env.REACT_APP_DOMAIN}</p> */}
        {/* <PricesComponent countries={countries.third}/> */}
        {/* <Suspense fallback={<div style={{color: "red", position: "absolute", top: "200px"}}>Loading...</div>}>
          <PricesComponent countries={countries.west} prices={this.state.prices}/>
        </Suspense> */}
        <PricesComponent countries={countries.west} prices={this.state.prices}/>
      </React.Fragment> 
      
    );
  }
}

const element = <App />;


ReactDOM.render(element, document.getElementById('react-div'));


export default App

