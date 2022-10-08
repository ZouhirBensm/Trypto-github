
// import React from 'react';
// import ReactDOM from 'react-dom'
// import MakeBuy from './btclayerexchange-functionalities/MakeBuy';
// import MakeSell from './btclayerexchange-functionalities/MakeSell';
// import CurrencyOrders from './btclayerexchange-functionalities/CurrencyOrders';
// import MyCurrencyOrders from './btclayerexchange-functionalities/MyCurrencyOrders';
// import Navigation from './btclayerexchange-functionalities/Navigation';
// import CurrencyOrderMatches from './btclayerexchange-functionalities/CurrencyOrderMatches';


import loadable from "@loadable/component";
// import Loading from "./Loading";
import Loading from "../generic-components/Loading";


const MakeCurrencyOrder = loadable(() => import("../btclayerexchange-functionalities/MakeCurrencyOrder"),{
  fallback: <Loading/>
});

const CurrencyOrders = loadable(() => import("../btclayerexchange-functionalities/CurrencyOrders"),{
  fallback: <Loading/>
});
const MyCurrencyOrders = loadable(() => import("../btclayerexchange-functionalities/MyCurrencyOrders"),{
  fallback: <Loading/>
});
const Navigation = loadable(() => import("../btclayerexchange-functionalities/Navigation"),{
  fallback: <Loading/>
});
const CurrencyOrderMatches = loadable(() => import("../btclayerexchange-functionalities/CurrencyOrderMatches"),{
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
            <Route exact path="/btclayerexchange/makebuy" component={MakeCurrencyOrder} />
            <Route exact path="/btclayerexchange/makesell" component={MakeCurrencyOrder} />

            <Route exact path="/btclayerexchange/allmyorders" render={
              (props) => <MyCurrencyOrders {...props} userID_toQueryWith={userId}/>
            } />
            <Route exact path="/btclayerexchange/matches" component={CurrencyOrderMatches} />
            <Route path="/btclayerexchange/:order_type" component={CurrencyOrders} />
          </Switch>     
        </BrowserRouter> 
        </div>
    )
  }
}

const element = <BTClayerexchange />;

ReactDOM.render(element, document.getElementById('react-div'));

