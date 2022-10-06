
// import React from 'react';
// import ReactDOM from 'react-dom'
// import MakeBuy from './orders-functionalities/MakeBuy';
// import MakeSell from './orders-functionalities/MakeSell';
// import Orders from './orders-functionalities/Orders';
// import MyOrders from './orders-functionalities/MyOrders';
// import Navigation from './orders-functionalities/Navigation';
// import Matches from './orders-functionalities/Matches';

// TODO refactor component names and endpoint names for market place
import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";


const Navigation = loadable(() => import("../orders-functionalities/Navigation"),{
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

            <Route exact path="/marketplace/databases/AllMyOrders" render={
              (props) => <MyMarketOrders {...props} userID_toQueryWith={userId}/>
            } />


            <Route exact path="/marketplace/databases/sellordersdata" component={MarketOrders} />

            <Route exact path="/marketplace/make/makesell" component={MakeMarketOrder} />




            <Route path="/marketplace/databases/:order_type/:orderID" render={
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

