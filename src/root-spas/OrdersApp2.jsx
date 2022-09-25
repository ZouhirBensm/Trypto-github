
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
// import Loading from "./Loading";
import Loading from "../generic-components/Loading";


const Navigation = loadable(() => import("../orders-functionalities/Navigation"),{
  fallback: <Loading/>
});


const Make2 = loadable(() => import("../marketplace-functionalities/Make2"),{
  fallback: <Loading/>
});
// const Make = loadable(() => import("../orders-functionalities/Make"),{
//   fallback: <Loading/>
// });


// const Orders2 = loadable(() => import("../marketplace-functionalities/Orders2"),{
//   fallback: <Loading/>
// });

const Orders = loadable(() => import("../orders-functionalities/Orders"),{
  fallback: <Loading/>
});


// const MyOrders2 = loadable(() => import("../marketplace-functionalities/MyOrders2"),{
//   fallback: <Loading/>
// });
const MyOrders = loadable(() => import("../orders-functionalities/MyOrders"),{
  fallback: <Loading/>
});


// const Matches2 = loadable(() => import("../marketplace-functionalities/Matches2"),{
//   fallback: <Loading/>
// });
const Matches = loadable(() => import("../orders-functionalities/Matches"),{
  fallback: <Loading/>
});









import { BrowserRouter, Route, Switch} from 'react-router-dom';

class Databases extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    console.log("UID????", userId)
    return (
        <div>
        OrdersApp2
        <BrowserRouter> 
          <Switch> 
            {/* <Route exact path="/marketplace" component={Navigation} /> */}
            <Route exact path="/marketplace" render={
              (props) => <Navigation {...props} mode="marketplace"/>
            } />

            <Route exact path="/marketplace/databases/AllMyOrders" render={
              (props) => <MyOrders {...props} userID_toQueryWith={userId}/>
            } />
            <Route exact path="/marketplace/databases/matches" component={Matches} />
            <Route exact path="/marketplace/databases/:order_type" component={Orders} />
            <Route exact path="/marketplace/make/:type" component={Make2} />
          </Switch>     
        </BrowserRouter> 
        </div>
    )
  }
}

const element = <Databases />;

ReactDOM.render(element, document.getElementById('react-div'));

