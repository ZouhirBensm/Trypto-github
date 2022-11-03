
// import React, {Component} from 'react';
// import ReactDOM from 'react-dom'

// TODO #82 Have a way to keep track of unread messages, and to display that number as a red notification on the messages link on the nav bar and messages list icons /Users/Zouhir/Documents/MERN/BlockchainMERN/src/messenger-functionalities/Messages.jsx

import PageSelector from '../generic-components/PageSelector'
import MessageTable from '../messenger-functionalities/MessageTable';

import './styles/Messages.css' 

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
    // this._userId = document.getElementById("userId").innerHTML
    this._PassedUserID = this.props.userID_toQueryWith
    // this._currentUserEmail = document.getElementById("currentUserEmail").innerHTML
    this._PassedUserEmail = this.props.PassedUserEmail
    this._PassedUserName = this.props.PassedUserName
    this.controls = this.controls.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    // this.repairData = this.repairData.bind(this)


    this.loggedinUserObjInfo = this.props.loggedinUserObjInfo
    console.log("loggedinUserObjInfo: ", this.props.loggedinUserObjInfo)
    
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
    let response = await fetch(`/messaging/paginated-messages/${this._PassedUserID}?page=${this.state.page}&limit=${this.state.limit}`)
    
    // console.log("response: ", response)
    
    let serverOBJ = await response.json()

    
    if(response.ok){

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
    // Custom Errors get spitted out here
    } else {
      console.error("Error: ", serverOBJ)
    }

  }


  componentDidMount(){
    //DOM is ready
    this.loadData()
  }

  render() {
    console.log("Here convos!: ", this.state.convos)
    

    return (
      <React.Fragment>
        <div className="wrapper">
          <h2>Messages Component</h2>
          <h4>Logged in as: {this._PassedUserName}</h4>
          <MessageTable 
          comprehensiveSelectedUserInfoDataObj={this.props.comprehensiveSelectedUserInfoDataObj}
          loggedinUserObjInfo={this.loggedinUserObjInfo}
          PassedUserID={this._PassedUserID}
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
        </div>
      </React.Fragment>
    )
  }
}


export default Messages

