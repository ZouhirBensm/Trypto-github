import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";


const Navigation = loadable(() => import("../btclayerexchange-functionalities/Navigation"), {
  fallback: <Loading />
});

const MakeMarketOrder = loadable(() => import("../marketplace-functionalities/MakeMarketOrder"), {
  fallback: <Loading />
});

const MarketOrders = loadable(() => import("../marketplace-functionalities/MarketOrders"), {
  fallback: <Loading />
});

const MyMarketOrders = loadable(() => import("../marketplace-functionalities/MyMarketOrders"), {
  fallback: <Loading />
});

const MarketOrderDetails = loadable(() => import("../marketplace-functionalities/MarketOrderDetails2"), {
  fallback: <Loading />
});

import { BrowserRouter, Route, Switch } from 'react-router-dom';

class MarketPlace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // console.log("userId", userId)
  }
  render() {
    return (
      <div id="super-wrapper">
        <BrowserRouter>
          <Switch>
            {/* /marketplace */}
            <Route exact path="/marketplace" render={
              (props) => <Navigation {...props} mode="marketplace" />
            } />

            <Route exact path="/marketplace/makesell" render={
              (props) => <MakeMarketOrder {...props} />
            } />




            <Route exact path="/marketplace/sellordersdata" component={MarketOrders} />

            <Route exact path="/marketplace/allmyorders" render={
              (props) => <MyMarketOrders {...props} userID_toQueryWith={userId} />
            } />






            <Route path="/marketplace/:order_type/:orderID" render={
              (props) => <MarketOrderDetails {...props} />
            } />

          </Switch>
        </BrowserRouter>
      </div>

    )
  }
}

const element = <MarketPlace />;

ReactDOM.render(element, document.getElementById('react-div'));

