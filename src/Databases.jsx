
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import MakeBuy from './AppDep/MakeBuy';
import MakeSell from './AppDep/MakeSell';
import Orders from './AppDep/Orders';
import MyOrders from './AppDep/MyOrders';
import Navigation from './AppDep/Navigation';
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
            <Route exact path="/databases/:order_type" component={Orders} />
          </Switch>     
        </BrowserRouter> 
        </div>
    )
  }
}

const element = <Databases />;

ReactDOM.render(element, document.getElementById('contents'));

