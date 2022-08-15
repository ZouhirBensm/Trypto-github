import loadable from "@loadable/component";
// import Loading from "./Loading";
import Loading from "./generic-components/Loading";

const Messages = loadable(() => import("./messenger-functionalities/Messages"),{
  fallback: <Loading/>
});

const ChatContainer = loadable(() => import("./messenger-functionalities/ChatContainer"),{
  fallback: <Loading/>
});

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

