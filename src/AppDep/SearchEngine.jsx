import React, { Component } from 'react';

class SearchEngine extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <form onSubmit={this.props.handleSubmit}>
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
    );
  }
}


export default SearchEngine