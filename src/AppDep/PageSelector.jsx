import React, { Component } from 'react';
import '../styles/PageSelector.css'



class PageSelector extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    }
    this.handleClick = this.handleClick.bind(this);
    //this.handleClick = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ page: nextProps.page });  
  }

  handleClick(e) {
    //document.getElementById("myBtn").disabled = true;
    //console.log("ID: ", e.target.id)
    //console.log('child: ', this.props.previousPage, this.props.nextPage)
    //console.log("CHECK! : ", this.props.check)
    // console.log(parseInt(e.target.dataset.key))
    if(e.target.id == "previous"){
      //console.log("previous was clicked")
      this.setState({
          page: this.state.page-1
      }, () => {
        //console.log(this.state.page)
        this.props.controls(this.state.page)
      })
    }
    else if(e.target.id == "next"){
      //console.log("next was clicked")
      this.setState({
        page: this.state.page+1
      }, () => {
        //console.log(this.state.page)
        this.props.controls(this.state.page)
      })
    }

    if(e.target.dataset.key) {
      this.setState({
        page: parseInt(e.target.dataset.key)
      }, () => {
        //console.log(this.state.page)
        this.props.controls(this.state.page)
      })
    }
  }



  render() {
    let pages_numbers = [];
    for (let i = 1; i < this.props.number_of_pages+1; i++) {
      pages_numbers.push(i)
    }

    let numbered_list = pages_numbers.map(
      page_number => {
        if(this.state.page === page_number){
          return <span data-key={page_number} onClick={this.handleClick} key={page_number} style={{color: "red"}}>    {page_number}    </span>
        }
        return <span data-key={page_number} onClick={this.handleClick} key={page_number}>    {page_number}    </span>
      }
    )

    let extra_span_keys = this.props.number_of_pages
    if(numbered_list.length>4) {
      if(this.state.page === 1 || this.state.page === 2) {
        console.log("not trimmed start")
        numbered_list = numbered_list.slice(0, 4)
        numbered_list.push(<span data-key={this.props.number_of_pages} onClick={this.handleClick} key={++extra_span_keys}>    ...    </span>)
      } else if (this.state.page === numbered_list.length || this.state.page === numbered_list.length-1 || this.state.page === numbered_list.length-2) {
        console.log("not trimmed end")
        numbered_list = numbered_list.slice(-4)
        numbered_list.unshift(<span data-key={1} onClick={this.handleClick} key={++extra_span_keys}>    ...    </span>)
      } else if (this.state.page-2 > 0 && this.state.page+2 < numbered_list.length) {
        console.log("trimed")
        numbered_list = numbered_list.slice(this.state.page-2,this.state.page+2)
        numbered_list.push(<span data-key={this.props.number_of_pages} onClick={this.handleClick} key={++extra_span_keys}>    ...    </span>)
        numbered_list.unshift(<span data-key={1} onClick={this.handleClick} key={++extra_span_keys}>    ...    </span>)
      }
    }
    console.log("numbered_list2", numbered_list)
    // console.log("you are on page:", this.state.page, "\n", "lower bound:", this.state.page,"\n", "upper bound:", this.state.page,"\n", "and their is:", this.props.number_of_pages,"\n")

    //console.log("childs fucking page: ", this.state.page)

    return (
      <div className="wrapper3">

        {this.props.number_of_pages === 0 ? <div>No entries avaible at the moment</div> : ''}
        {/* <h1>PageSelector</h1>
        <p>you are on page: {this.state.page}</p>
        <p>and their is: {this.props.number_of_pages}</p> */}
        <div className="pagination">
          <button disabled={this.props.on_off_limit_previous} id="previous" onClick={this.handleClick}>Previous Page</button>
          <div className="page_numbers">
            {numbered_list.length === 0 ? '0': numbered_list}

          </div>
          <button disabled={this.props.on_off_limit_next} id="next"  onClick={this.handleClick}>Next Page</button>
        </div>
        
      </div>
    );
  }
}


export default PageSelector