
// import React from 'react';
// import ReactDOM from 'react-dom'
// import MakeBuy from './orders-functionalities/MakeBuy';
// import MakeSell from './orders-functionalities/MakeSell';
// import Orders from './orders-functionalities/Orders';
// import MyOrders from './orders-functionalities/MyOrders';
// import Navigation from './orders-functionalities/Navigation';
// import Matches from './orders-functionalities/Matches';


import loadable from "@loadable/component";
// import Loading from "./Loading";
import Loading from "../generic-components/Loading";


const Make = loadable(() => import("../orders-functionalities/Make"),{
  fallback: <Loading/>
});

const Orders = loadable(() => import("../orders-functionalities/Orders"),{
  fallback: <Loading/>
});
const MyOrders = loadable(() => import("../orders-functionalities/MyOrders"),{
  fallback: <Loading/>
});
const Navigation = loadable(() => import("../orders-functionalities/Navigation"),{
  fallback: <Loading/>
});
const Matches = loadable(() => import("../orders-functionalities/Matches"),{
  fallback: <Loading/>
});



import { BrowserRouter, Route, Switch} from 'react-router-dom';

class BTClayerexchange extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    console.log("----->>>>>> ici", userId)
    return (
        <div>
        <BrowserRouter> 
          <Switch> 
            {/* <Route exact path="/databases/" component={Navigation} /> */}
            <Route exact path="/btclayerexchange" render={
              (props) => <Navigation {...props} mode="orders"/>
            } />
            <Route exact path="/btclayerexchange/makebuy" component={Make} />
            <Route exact path="/btclayerexchange/makesell" component={Make} />
            
            <Route exact path="/btclayerexchange/allmyorders" render={
              (props) => <MyOrders {...props} userID_toQueryWith={userId}/>
            } />
            <Route exact path="/btclayerexchange/matches" component={Matches} />
            <Route path="/btclayerexchange/:order_type" component={Orders} />
          </Switch>     
        </BrowserRouter> 
        </div>
    )
  }
}

const element = <BTClayerexchange />;

ReactDOM.render(element, document.getElementById('react-div'));

