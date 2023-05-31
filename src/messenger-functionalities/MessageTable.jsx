// import React from 'react';
import './styles/MessageTable.css' 
import utils from '../../full-stack-libs/utils'

import './styles/MessageTable.css'

class MessageTable extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
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
      <table>
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
    // console.log(`row ${this.props.keyy} executing: `, convo)

    // console.log("convo.protagonists.protagonists", convo.protagonists.protagonists)


    const communicating_with = convo.protagonists.protagonists.filter(protagonist => {return protagonist._id != this.PassedUserID})

    // console.log("this first: ", communicating_with[0])

    const {_id: communicating_with_ID, username: communicating_with_username, email: communicating_with_email, userprofileimageID: comunicating_with_userprofileimageID} = communicating_with[0]

    console.log("this", communicating_with_ID, communicating_with_username, communicating_with_email, comunicating_with_userprofileimageID)

    let comunicating_with_profile_image_name = `square.png`
    
    if (comunicating_with_userprofileimageID) {

      comunicating_with_profile_image_name = comunicating_with_userprofileimageID.image.name
    } 

    const most_recent_convo_text = convo.msg_stream.at(-1).text
    const most_recent_convo_sender_email = convo.msg_stream.at(-1).sender.email
    let most_recent_convo_sender_username = convo.msg_stream.at(-1).sender.username

    if (most_recent_convo_sender_username != communicating_with_username) {
      most_recent_convo_sender_username = "You"
    }

    console.log(`/img/profile-images/${comunicating_with_profile_image_name}`)



    // console.log("Require Keys: ", display_editing)
    return(
      <tr onClick={(e) => this.handleClick(this.props.comprehensiveSelectedUserInfoDataObj, communicating_with_ID, e)}>

        <td id="comm-with">
          <img src={`/img/profile-images/${comunicating_with_profile_image_name}`} alt="" />
          <span> {communicating_with_username}</span>
        </td>

        <td id="last-message">
          <span>
            {most_recent_convo_sender_username}:
          </span>
          <span>
            {most_recent_convo_text}
          </span>
        </td>

        {/* TODO !! To be added, do NOT DELETE */}
        {/* <td id="comm-with-ID" style={{"display": "none"}}>Com w\ ID: {communicating_with_ID}</td>

        <td id="msg-notifications" style={{"display": "none"}}>#</td> */}

      </tr>
    );
  }
}

export default MessageTable