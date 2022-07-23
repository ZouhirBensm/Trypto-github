// import React from 'react';
import './styles/MsgInputSubmit.css' 

class MsgInputSubmit extends React.Component {

  constructor(){
    super()
    this.state = {
    }
    this._userID = document.getElementById("userId").innerHTML
    this._currentUserEmail = document.getElementById("currentUserEmail").innerHTML
    console.log(this._userID)
  }


  render() {
    
    return (
        <form id="chatForm">
          <input id="chat-input" type="text" name=""/>
          <input className="button" type="submit" value="Send"/>
          <input  id="chat-user-id" type="hidden" value={this._userID} name=""/>
          <input  id="chat-user-email" type="hidden" value={this._currentUserEmail} name=""/>
        </form>
    );
  }
}

export default MsgInputSubmit