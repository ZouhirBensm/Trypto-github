import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import MatcheRow from './AppDep/MatcheRow';
import './styles/Matches.css'



class Matches extends Component {
  constructor(){
    super()
    this.state = {
      matches: [],
      matchestype: 'buy-matches',
    }
    
    this.handleClick = this.handleClick.bind(this)
    //this.loadData(this.state.matchestype)
  }
 

  componentDidMount(){
    let url = window.location.href
    let result = /\/matches/g.test(url)
    //console.log('result:', url ,result)
    if(result){
      //DOM is ready
      this.loadData(this.state.matchestype)
      //console.log("data: ", this.state.matches)
    }
  }


  async loadData(_matchestype){
    const response = await fetch('http://localhost:3000/api/matches')
    
    const data = await response.json()
    //console.log(data,_matchestype)


    if(_matchestype === "buy-matches"){
      //console.log("Do this")
        this.setState({
          matches: data.bm,
          
        })
    } else if (_matchestype === "sell-matches"){
      //console.log("Do that")
        this.setState({
          matches: data.sm,
        })
    } else{
      console.log("Initial State or Error in _matchtype")
    }
    
    //console.log("Returned from api: ", data)

    

  
    
  }
  componentDidUpdate(prevProps, prevState) {

    // Typical usage (don't forget to compare props):
    if (this.state.matchestype !== prevState.matchestype) {
      this.loadData(this.state.matchestype);
      
    }
  }



  handleClick(e){
    //e.preventDefault()
    //console.log(e.target.value);
    this.setState({
      matchestype: e.target.value,
    })
  }

  render() {
    //console.log("Here: ", this.state.matches, this.state.matches.length)
    let matchesRows = []
    
    if(this.state.matches.length > 0){
      for (let i = 0; i < this.state.matches.length; i++) {
        matchesRows[i] = this.state.matches[i].map(order => {
          //console.log(this.state._matchestype, typeof order, order)
          return <MatcheRow key={order._id} order={order}/>
        });
      }
    }
    //console.log(matchesRows)


    return (
      <div className="matches">
          <form name="toogle">
            <label><input type="radio" id="matchesbuy" name="radio" value='buy-matches' defaultChecked onClick={this.handleClick}/>Sell orders that match my buys</label>
            <label><input type="radio" id="matchessell" name="radio" value='sell-matches' onClick={this.handleClick}/>Buy orders that match my sells</label>  
          </form>
          {/* {<h1>State: {this.state.matchestype}</h1>} */}
          <table className="bordered-table">
        <tbody>
          
          {matchesRows? matchesRows: <tr></tr>}
        </tbody>
      </table>
      </div>
    )
  }
}

const element = <Matches />;

ReactDOM.render(element, document.getElementById('contents'));