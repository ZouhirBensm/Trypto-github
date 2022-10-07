
// import React from 'react';
// import ReactDOM from 'react-dom'
// import MakeBuy from './btclayerexchange-functionalities/MakeBuy';
// import MakeSell from './btclayerexchange-functionalities/MakeSell';
// import Orders from './btclayerexchange-functionalities/Orders';
// import MyOrders from './btclayerexchange-functionalities/MyOrders';
// import Navigation from './btclayerexchange-functionalities/Navigation';
// import Matches from './btclayerexchange-functionalities/Matches';


import loadable from "@loadable/component";
// import Loading from "./Loading";
import Loading from "../generic-components/Loading";


const Make = loadable(() => import("../btclayerexchange-functionalities/Make"),{
  fallback: <Loading/>
});

const Orders = loadable(() => import("../btclayerexchange-functionalities/Orders"),{
  fallback: <Loading/>
});
const MyOrders = loadable(() => import("../btclayerexchange-functionalities/MyOrders"),{
  fallback: <Loading/>
});
const Navigation = loadable(() => import("../btclayerexchange-functionalities/Navigation"),{
  fallback: <Loading/>
});
const Matches = loadable(() => import("../btclayerexchange-functionalities/Matches"),{
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

