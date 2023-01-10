import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";


const MakeCurrencyOrder = loadable(() => import("../btclayerexchange-functionalities/MakeCurrencyOrder3"),{
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
    // console.log("\nuserId----->>>>>>", userId)
    return (
        <div>
        <BrowserRouter> 
          <Switch> 
            <Route exact path="/currency/btclayerexchange" component={Navigation} />

            <Route exact path="/currency/btclayerexchange/makebuy" component={MakeCurrencyOrder} />
            <Route exact path="/currency/btclayerexchange/makesell" component={MakeCurrencyOrder} />

            <Route exact path="/currency/btclayerexchange/allmyorders" render={
              (props) => <MyCurrencyOrders {...props} userID_toQueryWith={userId}/>
            } />

            <Route exact path="/currency/btclayerexchange/matches" component={CurrencyOrderMatches} />
            

            
            <Route path="/currency/btclayerexchange/:order_type" component={CurrencyOrders} />

          </Switch>     
        </BrowserRouter> 
        </div>
    )
  }
}

const element = <BTClayerexchange />;

ReactDOM.render(element, document.getElementById('react-div'));

