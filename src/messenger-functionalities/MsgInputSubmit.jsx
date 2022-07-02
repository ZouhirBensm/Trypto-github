import React from 'react';
import './styles/MsgInputSubmit.css' 

class MsgInputSubmit extends React.Component {

  constructor(){
    super()
    this.state = {
    }
  }


  render() {
    
    return (
        <form id="chatForm">
          <input type="text" name="" id="chat-input"/>
          <input className="button" type="submit" value="Send"/>
        </form>
    );
  }
}

export default MsgInputSubmit