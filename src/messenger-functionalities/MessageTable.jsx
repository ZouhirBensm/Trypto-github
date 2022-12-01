// import React from 'react';
import utils from '../../full-stack-libs/utils'

class MessageTable extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
    // console.log("QWQEWEREWGRGRGRGTGTGHT____", this.props.loggedinUserObjInfo)
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

    return(
      <table className="bordered-table">
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
    this.state = {
    }

    // console.log(this.props.loggedinUserObjInfo)

    
    this.handleClick = this.handleClick.bind(this)
    // this.deal = this.deal.bind(this)
    
    this.PassedUserID = this.props.PassedUserID
    this.loggedinUserObjInfo = this.props.loggedinUserObjInfo
    // this.userId = document.getElementById("userId").innerHTML
  }

  handleClick(comprehensiveSelectedUserInfoDataObj, communicating_with_ID, e){
    e.preventDefault()

    const parsedURL = utils.parseURL(window.location.href)
    const firstpath = utils.parseFullPath4firstpath(parsedURL[3])


    console.log("BAM", this.loggedinUserObjInfo?.role, firstpath, "BAM")

    if(this.loggedinUserObjInfo?.role == "MASTER" && firstpath == "operations"){
      console.log("MAster JOB!")
      // console.log(comprehensiveSelectedUserInfoDataObj)

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

    const {_id: communicating_with_ID, username: communicating_with_username, email: communicating_with_email} = communicating_with[0]

    console.log("this", communicating_with_ID, communicating_with_username, communicating_with_email)

    const most_recent_convo_text = convo.msg_stream.at(-1).text
    const most_recent_convo_sender_email = convo.msg_stream.at(-1).sender.email
    const most_recent_convo_sender_username = convo.msg_stream.at(-1).sender.username



    // console.log("Require Keys: ", display_editing)
    return(
      <tr onClick={(e) => this.handleClick(this.props.comprehensiveSelectedUserInfoDataObj, communicating_with_ID, e)}>
        {/* TODO !!!! #85 Add Profile pictures to users */}
        <td id="img-profile" style={{"display": "none"}}>Com w\ username: {communicating_with_username}</td>

        <td id="comm-with-email">Com w\ username: {communicating_with_username}</td>

        <td id="comm-with-ID" style={{"display": "none"}}>Com w\ ID: {communicating_with_ID}</td>

        <td id="msg-notifications">#</td>

        <td id="last-sender-email">From: {most_recent_convo_sender_username} </td>

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