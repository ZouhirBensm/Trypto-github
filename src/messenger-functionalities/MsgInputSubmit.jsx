import React from 'react';
import './styles/MsgInputSubmit.css' 

class MsgInputSubmit extends React.Component {

  constructor(){
    super()
    this.state = {
    }
    this._userID = document.getElementById("userId").innerHTML
    console.log(this._userID)
  }


  render() {
    
    return (
        <form id="chatForm">
          <input id="chat-input" type="text" name=""/>
          <input className="button" type="submit" value="Send"/>
          <input  id="chat-user-id" type="hidden" value={this._userID} name=""/>
        </form>
    );
  }
}

export default MsgInputSubmit