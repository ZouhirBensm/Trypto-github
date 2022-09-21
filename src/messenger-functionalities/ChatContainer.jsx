// import React from 'react';
// import './styles/MgtUser.css' 
import MsgInputSubmit from './MsgInputSubmit';
import MsgsBox from './MsgsBox';
import './styles/ChatContainer.css';
import utils from "../../full-stack-libs/utils"

class ChatContainer extends React.Component {

  constructor(){
    super()
    this.state = {
    }
    // this._userID = document.getElementById("userId").innerHTML
    this._userID = userId
    // console.log('compare uid', document.getElementById("userId").innerHTML, userId)
    // this._currentUserEmail = document.getElementById("currentUserEmail").innerHTML
    this._currentUserEmail = currentUserEmail
    // console.log('compare currentUserEmail', document.getElementById("currentUserEmail").innerHTML, currentUserEmail)
    // this._userIDB = document.getElementById("userIdB").innerHTML
    this._userIDB = userIdB
    // console.log('compare userIdB', document.getElementById("userIdB").innerHTML, userIdB)
    // this._orderID = document.getElementById("orderId").innerHTML
    this._orderID = orderId
    // console.log('compare orderId', document.getElementById("orderId").innerHTML, orderId)
  }
  
  componentDidMount(){
    window.utils = utils
    // const reference = document.getElementsByClassName("wrapper-chat")[0]
    const reference = document.getElementById("chatForm")

    const script1 = document.createElement("script");
    const script2 = document.createElement("script");

    script1.src = "socket.io/socket.io.js";
    script2.src = "js/socketio.js";

    script1.async = false;
    script2.async = false; 

    
    // document.body.appendChild(script1);
    // document.body.appendChild(script2);

    insertAfter(reference, script1)
    insertAfter(script1, script2)

    function insertAfter(referenceNode, newNode ) {
      console.log(referenceNode.parentNode)
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  }


  render() {
    console.log("Do we have access to currentUserEmail??", currentUserEmail)
    
    return (
      <React.Fragment>
        <div className="wrapper-chat">
          <h1>Chat:</h1>
          <p>LoggedIn as</p>
          <p>{this._userID}</p>
          <p><strong>{this._currentUserEmail}</strong></p>
          <h1>Communicating to:</h1>
          <p>{this._userIDB}</p>
          <h1>Order ID:</h1>
          <p>{this._orderID}</p>
          <MsgInputSubmit/>
          <MsgsBox/>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatContainer