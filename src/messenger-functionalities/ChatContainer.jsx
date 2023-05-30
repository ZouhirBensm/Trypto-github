// import React from 'react';
// import './styles/MgtUser.css' 
import MsgInputSubmit from './MsgInputSubmit';
import MsgsBox from './MsgsBox';
import DisplayOtherCard from './DisplayOtherCard'
import './styles/ChatContainer.css';
import utils from "../../full-stack-libs/utils"

class ChatContainer extends React.Component {

  constructor(){
    super()
    this.state = {
    }
    this._userID = userId
    this._currentUserEmail = currentUserEmail
    this._userB_profile_image_path = userB_profile_image_path
    this.currentUserName = currentUserName
    this._userIDB = userIdB
    this._userUsernameB = userUsernameB
    this._orderID = orderId

    console.log("ChatContainer: constructor()->\n", {
      userId: this._userId, 
      currentUserEmail: this._currentUserEmail, 
      currentUserName: this.currentUserName, 
      userIdB: this._userIdB, 
      userUsernameB: this._userUsernameB,
      userB_profile_image_path: this._userB_profile_image_path,
      orderId: this._orderId, 
    })

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
      // console.log(referenceNode.parentNode)
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  }


  render() {
    // console.log("ChatContainer: render()->currentUserEmail:", currentUserEmail)

    console.log(this._userB_profile_image_path)
    
    return (
      <React.Fragment>
        <div id="chat-total">
          
          {/* <h1>LoggedIn as</h1>
          <p>{this._userID}</p>
          <p><strong>{this._currentUserEmail}</strong></p>

          <h1>Communicating to:</h1>
          <p>{this._userIDB}</p>

          <h1>Order ID:</h1>
          <p>{this._orderID}</p> */}

          <div id="chat">
            <DisplayOtherCard
              userIdB={this._userIDB}
              userUsernameB={this._userUsernameB}
              userB_profile_image_path={this._userB_profile_image_path}
            />
            <MsgsBox/>
          </div>
          <MsgInputSubmit/>

        </div>
      </React.Fragment>
    );
  }
}

export default ChatContainer