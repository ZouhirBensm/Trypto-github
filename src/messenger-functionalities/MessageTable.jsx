// import React from 'react';
import utils from '../../full-stack-libs/utils'

class MessageTable extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){

    let convosRow

    if(this.props.convos){
      convosRow = this.props.convos.map((convo, i) => {
        return <MessageRow 
        key={i} 
        keyy={i} 
        comprehensiveSelectedUserInfoDataObj={this.props.comprehensiveSelectedUserInfoDataObj}
        PassedUserID={this.props.PassedUserID}
        convo={convo}
        loggedinUserObjInfo={this.props.loggedinUserObjInfo}
        />
      })
    } else {
      console.error(`this.props.convos resolved to a false for some reason`)
    }

    // console.log("done execution we got: ", convosRow)
    // console.log("Does Not Require Keys: ", ordersRow)

    return(
      <table className="bordered-table">
        {/* <thead>
          <tr>
            <th>Order _id</th>
            <th>Posted by</th>
            <th>Date Posted</th>
            <th>Crypto</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Expiry</th>
            <th>Payment</th>
            <th>Deal</th>
          </tr>
        </thead> */}
        <tbody>
          {convosRow}
        </tbody>
      </table>
    );
  }
}


class MessageRow extends React.Component {
  constructor(props){
    super(props)
    // this.state = {

    // }

    console.log(this.props.loggedinUserObjInfo)
    this.handleClick = this.handleClick.bind(this)
    
    // this.deal = this.deal.bind(this)
    // this.userId = document.getElementById("userId").innerHTML
    this.PassedUserID = this.props.PassedUserID
    console.log("this.PassedUserID @@@", this.PassedUserID)
    this.loggedinUserObjInfo = this.props.loggedinUserObjInfo
  }

  handleClick(comprehensiveSelectedUserInfoDataObj, communicating_with_ID, e){
    e.preventDefault()

    const parsedURL = utils.parseURL(window.location.href)
    const firstpath = utils.parseFullPath4firstpath(parsedURL[3])

    if(this.loggedinUserObjInfo?.role == "MASTER" && firstpath == "operations"){
      console.log("MAster JOB!")
      console.log(comprehensiveSelectedUserInfoDataObj)

      // WORKED TEST
      // window.location.href = `/operations/test`

      // WORKED MORE
      // window.location.href = `/operations/monitor-messages/edit-see/more?comprehensiveUserInfo=${JSON.stringify(comprehensiveSelectedUserInfoDataObj)}`

      window.location.href = `/operations/monitor-messages/${this.PassedUserID}/edit-see?comprehensiveSelectedUserInfo=${JSON.stringify(comprehensiveSelectedUserInfoDataObj)}&orderId=${undefined}&userIdB=${communicating_with_ID}`
      // window.location.href = `/operations/monitor-messages/${this.PassedUserID}/edit-see`
    } else {
      window.location.href = `/messaging?orderId=${undefined}&userIdB=${communicating_with_ID}`
    }
  }

  // deal(order, e){
  //   e.preventDefault()
  //   // console.log(`/messaging?orderId=${order._id}&userIdB=${order.userid._id}`)
  //   window.location.href = `/messaging?orderId=${order._id}&userIdB=${order.userid._id}`
  // }


  render(){
    const convo = this.props.convo;
    console.log(`row ${this.props.keyy} executing: `, convo)

    console.log("convo.protagonists.protagonists", convo.protagonists.protagonists)


    const communicating_with = convo.protagonists.protagonists.filter(protagonist => {return protagonist._id != this.PassedUserID})
    console.log("this first: ", communicating_with[0])

    const {_id: communicating_with_ID, email: communicating_with_email} = communicating_with[0]

    console.log("this", communicating_with_ID, communicating_with_email)

    const most_recent_convo_text = convo.msg_stream.at(-1).text
    const most_recent_convo_sender_email = convo.msg_stream.at(-1).sender.email



    // console.log("Require Keys: ", display_editing)
    return(
      <tr onClick={(e) => this.handleClick(this.props.comprehensiveSelectedUserInfoDataObj, communicating_with_ID, e)}>
        {/* TODO #85 Add Profile pictures to users */}
        <td id="img-profile">Com w\ email: {communicating_with_email}</td>
        <td id="comm-with-email" style={{"display": "none"}}>Com w\ email{communicating_with_email}</td>
        <td id="comm-with-ID" style={{"display": "none"}}>Com w\ ID: {communicating_with_ID}</td>
        <td id="msg-notifications">#</td>
        <td id="last-sender-email">From: {most_recent_convo_sender_email}</td>
        <td id="recent-msg">Said: {most_recent_convo_text}</td>

        {/* 
        <td id="img-profile"></td>
        <td id="new-msgs">ok</td>
        <td id="recent-msg">ok</td> */}
      </tr>
    );
  }
}

export default MessageTable