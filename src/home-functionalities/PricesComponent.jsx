// import React, {lazy, Suspense} from 'react';
import Prices from './Prices';

class PricesComponent extends React.Component {
  constructor(){
    super()
    this.state = {
      country: 'Canada'
    }
    this.handleClick = this.handleClick.bind(this)
    this.popup = document.getElementById("popup").innerHTML
  }

  handleClick(e){
    e.preventDefault()
    //console.log(e.target.value);
    this.setState({
      country: e.target.value
    })
    // document.getElementsByName("toogle");
  }

  render() {
    console.log("popup:", this.popup)

    let i=0
    const pricesRows = this.props.prices.map(price => {
        i++
        return (
            <Prices key={i} price={price} country={this.state.country}/>
        )
      }
    )
    //console.log(typeof this.props.prices)


    return (
    <div className="prices">
      <form name="toogle">
        <label><input type="radio" id="Canada" name="radio" value={this.props.countries.one} onClick={this.handleClick}/>{this.props.countries.one}</label>
        <label><input type="radio" id="America" name="radio" value={this.props.countries.two} onClick={this.handleClick}/>{this.props.countries.two}</label>  
        <label><input type="radio" id="Europe" name="radio" value={this.props.countries.three} onClick={this.handleClick}/>{this.props.countries.three}</label>
      </form>
      <table className="bordered-table">
      <thead>
        <tr>
          <th>Country</th>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {pricesRows}
      </tbody>
    </table>
    {this.popup?
    <p>{this.popup}</p>
    :null}
    </div>

    );
  }
}

export default PricesComponent
