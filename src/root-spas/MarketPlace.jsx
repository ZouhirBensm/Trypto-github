import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";

import './styles/MarketPlace.css'

const MakeMarketOrder = loadable(() => import("../marketplace-functionalities/MakeMarketOrder"), {
  fallback: <Loading />
});

const MarketOrders = loadable(() => import("../marketplace-functionalities/MarketOrders"), {
  fallback: <Loading />
});

const MyMarketOrders = loadable(() => import("../marketplace-functionalities/MyMarketOrders"), {
  fallback: <Loading />
});

const MarketOrderDetails = loadable(() => import("../marketplace-functionalities/MarketOrderDetails"), {
  fallback: <Loading />
});


import { BrowserRouter, Route, Switch } from 'react-router-dom';

class MarketPlace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // console.log("userId", userId)
  }

  render() {
    return (
      <div id="market">
        <BrowserRouter>
          <Switch>
            <Route exact path="/marketplace/makesell" component={MakeMarketOrder} />
            <Route exact path="/marketplace/sellordersdata" component={MarketOrders} />

            <Route exact path="/marketplace/allmyorders" render={
              (props) => <MyMarketOrders {...props} userID_toQueryWith={userId} />
            } />

            <Route exact path="/marketplace/:order_type/:orderID" component={MarketOrderDetails} />

          </Switch>
        </BrowserRouter>
      </div>

    )
  }
}

const element = <MarketPlace />;

ReactDOM.render(element, document.getElementById('react-div'));

