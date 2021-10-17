import React, { Component } from 'react';



class PageSelector extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    }
    this.handleClick = this.handleClick.bind(this);
    //this.handleClick = this.handleChange.bind(this);
  }

  // handleChange(e){
  //   console.log("change!")
  //   // if(){

  //   // } 
  //   // else if(){

  //   // }
  //   console.log(this.state.page)
  // }
  handleClick(e) {
    //document.getElementById("myBtn").disabled = true;
    //console.log("ID: ", e.target.id)
    //console.log('child: ', this.props.previousPage, this.props.nextPage)

    if(e.target.id == "previous"){
      //console.log("previous was clicked")
      this.setState({
          page: this.state.page-1
      }, () => {
        console.log(this.state.page)
        this.props.controls(this.state.page)
      })
    }
    else if(e.target.id == "next"){
      //console.log("next was clicked")
      this.setState({
        page: this.state.page+1
      }, () => {
        this.props.controls(this.state.page)
        console.log(this.state.page)
      })
    }
  }
  render() {
    

    return (
      <div className="wrapper3">
        <h1>PageSelector</h1>
        <button disabled={this.props.on_off_limit_previous} id="previous" onClick={this.handleClick}>Previous Page</button>
        <button disabled={this.props.on_off_limit_next} id="next"  onClick={this.handleClick}>Next Page</button>
      </div>
    );
  }
}

export default PageSelector