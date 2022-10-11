// import React from 'react';
import React from 'react';
import './styles/SearchEngine.css'


class SearchEngine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on_off: false,
    }
    this.handleClick = this.handleClick.bind(this);
    console.log("order_type=", this.props.order_type)
  }


  handleClick(e = undefined) {
    e?.preventDefault()

    this.setState(prevState => ({
      on_off: !prevState.on_off
    }))
  }

  render() {
    let amountFilterInputs = this.setAmountFilterInputs()

    // ______________________________________________________

    // TODO add location to the currency app, and save it in db per orders, then complete search engine capabilities in the currency app after locality is integrated

    return (
      <React.Fragment>
        {!this.state.on_off ?
          <button className='drop-down' onClick={this.handleClick}>Drop Down</button> :


          <div className='search-inputs'>

            <form id="my_form" className='search-component' onSubmit={(e)=>{
              this.props.handleSubmit(e);
              this.handleClick()
              }} onChange={this.props.handleChange}>



              <h2>Filters:</h2>
              <label htmlFor="chain-select">BTC Type/Chain</label>
              <select name="chain" id="chain-select" defaultValue={this.props.searchEngineState.chainTerm}>
                <option value=''>Recent</option>
                <option value="Bitcoin Base Chain">Bitcoin Base Chain</option>
                <option value="Bitcoin Lightning">Bitcoin Lightning</option>
                <option value="Bitcoin Liquid">Bitcoin Liquid</option>
              </select><br />


              {/* {amountFilterInputs} */}


              <input type="submit" value="Submit" />

            </form>

            <button onClick={this.handleClick}>Drop Up</button>

          </div>
        }
      </React.Fragment>
    );
  }
  // ______________________________________________________

  setAmountFilterInputs() {
    let amountFilterInputs
    switch (this.props.order_type) {
      case "buyordersdata":
        amountFilterInputs = <React.Fragment>

          <label htmlFor="bottom-amount-select">Bottom Amount (CAD)</label>
          <input type="number" id="bottom-amount-select" name="bottomamount" required defaultValue='500' /> <br />
  
          <label htmlFor="top-amount-select">Top Amount (CAD)</label>
          <input type="number" id="top-amount-select" name="topamount" required defaultValue='1000' /> <br />
        </React.Fragment>
        break;
      case "sellordersdata":
        amountFilterInputs = <h1>Filter for sell</h1>
        break;

      default:
        amountFilterInputs = undefined
        break;
    }

    return amountFilterInputs
  }
}


export default SearchEngine