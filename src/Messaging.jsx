
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import ChatContainer from './messenger-functionalities/ChatContainer';

import { BrowserRouter, Route, Switch} from 'react-router-dom';

class Messaging extends Component {
  render() {
    return (
      <ChatContainer/>
    )
  }
}

const element = <Messaging />;

ReactDOM.render(element, document.getElementById('react-div'));

