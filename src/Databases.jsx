
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import MakeBuy from './databases-functionalities/MakeBuy';
import MakeSell from './databases-functionalities/MakeSell';
import Orders from './databases-functionalities/Orders';
import MyOrders from './databases-functionalities/MyOrders';
import Navigation from './databases-functionalities/Navigation';
import Matches from './databases-functionalities/Matches';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

class Databases extends Component {
  render() {
    return (
        <div>
        <BrowserRouter> 
          <Switch> 
            <Route exact path="/databases/" component={Navigation} />
            <Route exact path="/databases/makebuy" component={MakeBuy} />
            <Route exact path="/databases/makesell" component={MakeSell} />
            <Route exact path="/databases/AllMyOrders" component={MyOrders} />
            <Route exact path="/databases/matches" component={Matches} />
            <Route exact path="/databases/:order_type" component={Orders} />
          </Switch>     
        </BrowserRouter> 
        </div>
    )
  }
}

const element = <Databases />;

ReactDOM.render(element, document.getElementById('react-div'));

