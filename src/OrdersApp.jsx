
// import React from 'react';
// import ReactDOM from 'react-dom'
// import MakeBuy from './orders-functionalities/MakeBuy';
// import MakeSell from './orders-functionalities/MakeSell';
// import Orders from './orders-functionalities/Orders';
// import MyOrders from './orders-functionalities/MyOrders';
// import Navigation from './orders-functionalities/Navigation';
// import Matches from './orders-functionalities/Matches';


import loadable from "@loadable/component";
import Loading from "./Loading";


const Make = loadable(() => import("./orders-functionalities/Make"),{
  fallback: <Loading/>
});

const Orders = loadable(() => import("./orders-functionalities/Orders"),{
  fallback: <Loading/>
});
const MyOrders = loadable(() => import("./orders-functionalities/MyOrders"),{
  fallback: <Loading/>
});
const Navigation = loadable(() => import("./orders-functionalities/Navigation"),{
  fallback: <Loading/>
});
const Matches = loadable(() => import("./orders-functionalities/Matches"),{
  fallback: <Loading/>
});



import { BrowserRouter, Route, Switch} from 'react-router-dom';

class Databases extends React.Component {
  render() {
    return (
        <div>
        <BrowserRouter> 
          <Switch> 
            <Route exact path="/databases/" component={Navigation} />
            {/* <Route exact path="/databases/makebuy" component={MakeBuy} /> */}
            {/* <Route exact path="/databases/makesell" component={MakeSell} /> */}
            <Route exact path="/databases/AllMyOrders" component={MyOrders} />
            <Route exact path="/databases/matches" component={Matches} />
            <Route exact path="/databases/:order_type" component={Orders} />
            <Route exact path="/make/:type" component={Make} />
          </Switch>     
        </BrowserRouter> 
        </div>
    )
  }
}

const element = <Databases />;

ReactDOM.render(element, document.getElementById('react-div'));

