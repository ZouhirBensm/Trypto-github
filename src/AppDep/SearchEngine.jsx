import React, { Component } from 'react';


class SearchEngine extends Component {
  constructor() {
    super();
    this.state = {
      on_off: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.setState(prevState => ({
      on_off: !prevState.on_off
    }))
  }

  render() {

    return (
      <React.Fragment>
      {!this.state.on_off ? 
      <button className='drop-down' onClick={this.handleClick}>Drop Down</button> :
      <div className='search-inputs'>
        <form className='search-component' onSubmit={this.props.handleSubmit}>
          <label>
            Select a crypto you want to filter for
            <select value={this.props.searchTerm} onChange={this.props.handleChange}>
              <option value="All">All</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Litecoin">Litecoin</option>
              <option value="Zcash">Zcash</option>
              <option value="Bitcoin Cash">Bitcoin Cash</option>
              <option value="Monero">Monero</option>
            </select>
          </label>
          <input type="submit" value="Submit"/>
        </form>
        <button onClick={this.handleClick}>Drop Up</button>
      </div>
      }
      </React.Fragment>
    );
  }
}


export default SearchEngine