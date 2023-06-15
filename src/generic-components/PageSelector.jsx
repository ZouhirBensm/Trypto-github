// import React from 'react';
import './styles/PageSelector.css'



class PageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    }
    this.handleClick = this.handleClick.bind(this);
    this.paginatorSetter = this.paginatorSetter.bind(this);
    //this.handleClick = this.handleChange.bind(this);
    // console.log("props", props)
    this.numbered_list = this.paginatorSetter(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ page: nextProps.page });  
    // console.log(nextProps, this.props)
    this.numbered_list = this.paginatorSetter(nextProps)
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

  paginatorSetter(props){
    let pages_numbers = [];
    for (let i = 1; i < props.number_of_pages+1; i++) {
      pages_numbers.push(i)
    }

    let numbered_list = pages_numbers.map(
      page_number => {
        if(this.state.page === page_number){
          return <span className='selected ball' data-key={page_number} onClick={this.handleClick} key={page_number}></span>
        }
        return <span className='not-selected ball' data-key={page_number} onClick={this.handleClick} key={page_number}></span>
      }
    )

    let extra_span_keys = props.number_of_pages
    if(numbered_list.length>4) {
      if(this.state.page === 1 || this.state.page === 2) {
        // console.log("not trimmed start")
        numbered_list = numbered_list.slice(0, 4)
        numbered_list.push(<span className='pad ball' data-key={props.number_of_pages} onClick={this.handleClick} key={++extra_span_keys}></span>)
      } else if (this.state.page === numbered_list.length || this.state.page === numbered_list.length-1 || this.state.page === numbered_list.length-2) {
        // console.log("not trimmed end")
        numbered_list = numbered_list.slice(-4)
        numbered_list.unshift(<span className='pad ball' data-key={1} onClick={this.handleClick} key={++extra_span_keys}></span>)
      } else if (this.state.page-2 > 0 && this.state.page+2 < numbered_list.length) {
        // console.log("trimed")
        numbered_list = numbered_list.slice(this.state.page-2,this.state.page+2)
        numbered_list.push(<span className='pad ball' data-key={props.number_of_pages} onClick={this.handleClick} key={++extra_span_keys}></span>)
        numbered_list.unshift(<span className='pad ball' data-key={1} onClick={this.handleClick} key={++extra_span_keys}></span>)
      }
    }
    return numbered_list
  }



  render() {

    // console.log("numbered_list2", numbered_list)
    // console.log("you are on page:", this.state.page, "\n", "lower bound:", this.state.page,"\n", "upper bound:", this.state.page,"\n", "and their is:", this.props.number_of_pages,"\n")

    console.log("childs fucking page: ", this.state.page)
    console.log("<-:-> ", this.props.on_off_limit_previous, this.props.on_off_limit_next)

    return (
      <div id='pagination-fragment'>
        {this.props.number_of_pages === 0 ? <span id='popup'>No entries avaible at the moment</span> : ''}
        {/* <h1>PageSelector</h1>
        <p>you are on page: {this.state.page}</p>
        <p>and their is: {this.props.number_of_pages}</p> */}
        
        <div id="pagination">

          <button disabled={this.props.on_off_limit_previous} id="previous" onClick={this.handleClick}><img src="/img/SVG/sub/previous.svg" alt=""/></button>

          <div id="page_numbers">
            {this.numbered_list.length === 0 ? '0': this.numbered_list}
          </div>

          <button disabled={this.props.on_off_limit_next} id="next"  onClick={this.handleClick}><img src="/img/SVG/sub/proceed.svg" alt=""/></button>

        </div>
      </div>

    );
  }
}


export default PageSelector