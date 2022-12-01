import PricesComponent from '../home-functionalities/PricesComponent.jsx';
import '../style/reactDivMobile.css'




class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      prices: []
    }
    // this.repairData = this.repairData.bind(this)
  }


  componentDidMount(){
    // console.log("in component: ", userId)
    this.loadData()
  }
  
  async loadData(){
    let btc_gecko_prices = {}
    const response = await fetch(`/cryptoprice`)
    const data = await response.json()

    console.log(btc_gecko_prices, data.data.bitcoin)

    this.setState({
      prices: data.data.bitcoin
    })   
  }

    
  render() {

    return (
      
      // Home
      <React.Fragment>
        <PricesComponent btc_gecko_prices={this.state.prices}/>
        

      </React.Fragment> 
      
    );
  }



}

const element = <App />;


ReactDOM.render(element, document.getElementById('react-div'));


export default App




// require('react-dom');
// window.React2 = require('react');
// console.log("same---->>>", window.React1 === window.React2);
// console.log(window.React1)
// console.log(window.React2)