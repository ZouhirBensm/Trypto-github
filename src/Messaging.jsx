
// import React, {Component} from 'react';
// import ReactDOM from 'react-dom'

// TODO lazy loading will be required after
import ChatContainer from './messenger-functionalities/ChatContainer';
import Messages from './messenger-functionalities/Messages';

import { BrowserRouter, Route, Switch} from 'react-router-dom';

class Messaging extends React.Component {
  render() {
    return (
      // <ChatContainer/>
      <BrowserRouter> 
        <Switch> 
          <Route exact path="/messaging/messages" component={Messages}/>
          <Route exact path="/messaging" component={ChatContainer}/>
        </Switch>     
      </BrowserRouter> 
    )
  }
}

const element = <Messaging />;

ReactDOM.render(element, document.getElementById('react-div'));

