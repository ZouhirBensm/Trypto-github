
// import React, {Component} from 'react';
// import ReactDOM from 'react-dom'

// TODO #82 Have a way to keep track of unread messages, and to display that number as a red notification on the messages link on the nav bar and messages list icons /Users/Zouhir/Documents/MERN/BlockchainMERN/src/messenger-functionalities/Messages.jsx


// TODO #83 Will require to change directory to something more generic because used in messages page, and orders page
import PageSelector from '../orders-functionalities/PageSelector';
import MessageTable from '../messenger-functionalities/MessageTable';

class Messages extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      convos: [],
      page: 1,
      limit: 2, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      number_of_pages: 1,
    }
    this._userID = document.getElementById("userId").innerHTML
    this.controls = this.controls.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    // this.repairData = this.repairData.bind(this)
    
  }

  // Set the state of the page in the parent. Method called in child
  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      //console.log("callback: ", this.state.page)
      this.loadData()
    })
  }

  async loadData(){
    let response = await fetch(`${process.env.ROOT}/messaging/paginated-messages/${this._userID}?page=${this.state.page}&limit=${this.state.limit}`)

    // console.log("response: ", response)

    let serverOBJ = await response.json()

    console.log("serverOBJ: ", serverOBJ)

    this.setState({
      convos: serverOBJ.srv_.CONVOS,
      nextPage: serverOBJ.srv_.next,
      previousPage: serverOBJ.srv_.previous,
      number_of_pages: serverOBJ.srv_.number_of_pages.number
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


  componentDidMount(){
    //DOM is ready
    this.loadData()
  }

  render() {
    console.log("Here convos!: ", this.state.convos)
    

    return (
      <React.Fragment>
        <h2>Messages Component</h2>
        <MessageTable 
        // buttons='normal' 
        // order_type={this.props.match.params.order_type} 
        convos={this.state.convos}
        />
        <PageSelector 
        number_of_pages={this.state.number_of_pages} 
        page={this.state.page} 
        on_off_limit_previous={this.state.on_off_limit_previous} 
        on_off_limit_next={this.state.on_off_limit_next} 
        previousPage={this.state.previousPage} 
        nextPage={this.state.nextPage} 
        controls={this.controls}
        />
      </React.Fragment>
    )
  }
}


export default Messages

