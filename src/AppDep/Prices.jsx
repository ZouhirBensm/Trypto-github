import React from 'react';


class Prices extends React.Component {
  constructor(){
    super()
    this.renderSwitch = this.renderSwitch.bind(this)
  }

  renderSwitch(param, param2) {
    switch(param) {
      case "Canada":
        return param2.cad
      case "USA":
        return param2.usd
      case "EU":
        return param2.eur
      default:
        return ""
    } 
  }
  render() {

    const price = this.props.price;
    return (
      <tr>
        
        <td>{this.props.country}</td>
        <td>{price.name}</td>
        <td>
          {this.renderSwitch(this.props.country, price)}
        </td>
        
        
        
      </tr>

    );
  }
}

export default Prices