import './styles/Navigation.css'

class Navigation extends React.Component {
  constructor(props){
    super(props)
    this.state = { state: null }

    this.handleClick = this.handleClick.bind(this)
    this.switchResult = this.switchResult.bind(this)
  }

  handleClick(e){
    this.setState({
      state: e.target.id
    })
  }

  switchResult(_state){
    // console.log("_state---->", _state)

    switch(_state) {
      case null:
        return (
          <div className="default">
            <button id="Make" onClick={this.handleClick}>Create +</button>
            <button id="See" onClick={this.handleClick}>All</button>
          </div> 
        )
      case "Make":
        return (
          <div className="make">
            <a href="/currency/btclayerexchange/makebuy">Purchase</a>
            <a href="/currency/btclayerexchange/makesell">Sell</a>
          </div>
        )
      case "See":
        return (
          <div className="see"> 
            <a href={`/currency/btclayerexchange/buyordersdata`}>Clients</a>
            <a href={`/currency/btclayerexchange/sellordersdata`}>Sellers</a>
            <a href="/currency/btclayerexchange/allmyorders">My</a>
            <a href="/currency/btclayerexchange/matches">Matches</a>
          </div>
        )
      default:
        return null
    } 
    
  }
  
  render(){
    let component = this.switchResult(this.state.state);
    // console.log("this.state.state---->", this.state.state)
    
    return(
      <div className="databases-wrapper">
        {component}
      </div>
    )
  }
}

export default Navigation