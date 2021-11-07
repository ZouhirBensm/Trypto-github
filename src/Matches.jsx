import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import MatcheRow from './AppDep/MatcheRow';
import './styles/Matches.css'
import PageSelector from './AppDep/PageSelector';



class Matches extends Component {
  constructor(){
    super()
    this.state = {
      matches: [],
      matchestype: 'buy-matches',
      page: 1,
      limit: 2, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
    }
    this.controls = this.controls.bind(this);
    this.handleClick = this.handleClick.bind(this)
    //this.loadData(this.state.matchestype)
  }
  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      //console.log("callback: ", this.state.page)
      this.loadData(this.state.matchestype)
    })
  }

  componentDidMount(){
    //Might be an issue!!
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
    const response = await fetch(`http://localhost:3000/api/matches/${_matchestype}?page=${this.state.page}&limit=${this.state.limit}`)
    
    const data = await response.json()
    //console.log(data,_matchestype)
    
    //let arrayofmatches = []
    //arrayofmatches.push(data.data.results)
    console.log(data.data)

    
    this.setState({
      matches: data.data.results,
      nextPage: data.data.next,
      previousPage: data.data.previous,
    }, () => {
      if(this.state.nextPage==undefined){
        this.setState({
          on_off_limit_next: true
        })
      } else {
        this.setState({
          on_off_limit_next: false
        })
      }
      if(this.state.previousPage==undefined){
        this.setState({
          on_off_limit_previous: true
        })
      } else {
        this.setState({
          on_off_limit_previous: false
        })
      }

    })
    
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
      page: 1,
    }, () => {
      this.loadData(this.state.matchestype);
    })
  }

  render() {
    //console.log("Here: ", this.state.matches, this.state.matches.length)
    // let matchesRows = []
    
    // if(this.state.matches.length > 0){
    //   for (let i = 0; i < this.state.matches.length; i++) {
    //     matchesRows[i] = this.state.matches[i].map(order => {
    //       console.log("row: ", this.state.matchestype, typeof order, order)
    //       return <MatcheRow key={order._id} order={order}/>
    //     });
    //   }
    // }
    const matchesRows = this.state.matches.map(order => {
      console.log("row: ", this.state.matchestype, typeof order, order)
      return <MatcheRow key={order._id} order={order}/>
    });

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
      <PageSelector page={this.state.page} on_off_limit_previous={this.state.on_off_limit_previous} on_off_limit_next={this.state.on_off_limit_next} previousPage={this.state.previousPage} nextPage={this.state.nextPage} controls={this.controls}/>
      </div>
    )
  }
}

const element = <Matches />;

ReactDOM.render(element, document.getElementById('contents'));