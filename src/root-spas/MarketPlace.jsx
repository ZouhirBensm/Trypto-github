
// import React from 'react';
// import ReactDOM from 'react-dom'
// import MakeBuy from './btclayerexchange-functionalities/MakeBuy';
// import MakeSell from './btclayerexchange-functionalities/MakeSell';
// import Orders from './btclayerexchange-functionalities/Orders';
// import MyOrders from './btclayerexchange-functionalities/MyOrders';
// import Navigation from './btclayerexchange-functionalities/Navigation';
// import Matches from './btclayerexchange-functionalities/Matches';

// TODO refactor component names and endpoint names for market place
import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";


const Navigation = loadable(() => import("../btclayerexchange-functionalities/Navigation"),{
  fallback: <Loading/>
});

// const Navigation2 = loadable(() => import("../generic-components/Navigation2"),{
//   fallback: <Loading/>
// });

const MakeMarketOrder = loadable(() => import("../marketplace-functionalities/MakeMarketOrder"),{
  fallback: <Loading/>
});


const MarketOrders = loadable(() => import("../marketplace-functionalities/MarketOrders"),{
  fallback: <Loading/>
});


const MyMarketOrders = loadable(() => import("../marketplace-functionalities/MyMarketOrders"),{
  fallback: <Loading/>
});

const MarketOrderDetails = loadable(() => import("../marketplace-functionalities/MarketOrderDetails"),{
  fallback: <Loading/>
});





import { BrowserRouter, Route, Switch} from 'react-router-dom';

class MarketPlace extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    console.log("UID????", userId)
    return (
        <div className="wrapper">
        {/* OrdersApp2 */}
        <BrowserRouter> 
          <Switch> 
            {/* <Route exact path="/marketplace" component={Navigation} /> */}
            <Route exact path="/marketplace" render={
              (props) => <Navigation {...props} mode="marketplace"/>
            } />

            <Route exact path="/marketplace/allmyorders" render={
              (props) => <MyMarketOrders {...props} userID_toQueryWith={userId}/>
            } />


            <Route exact path="/marketplace/sellordersdata" component={MarketOrders} />

            <Route exact path="/marketplace/makesell" component={MakeMarketOrder} />




            <Route path="/marketplace/:order_type/:orderID" render={
              (props) => <MarketOrderDetails {...props}/>
            }/> 

          </Switch>     
        </BrowserRouter> 
        </div>
    )
  }
}

const element = <MarketPlace />;

ReactDOM.render(element, document.getElementById('react-div'));

