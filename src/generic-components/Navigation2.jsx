// import React from 'react';
import './styles/Navigation2.css'

import { Link, Switch, Route, BrowserRouter } from "react-router-dom";

import loadable from "@loadable/component";
import Loading from "./Loading";


const MakeMarketOrder = loadable(() => import("../marketplace-functionalities/MakeMarketOrder"),{
  fallback: <Loading/>
});

const InnerNavigation2 = loadable(() => import("./InnerNavigation2"),{
  fallback: <Loading/>
});


// const MarketOrders = loadable(() => import("../marketplace-functionalities/MarketOrders"),{
//   fallback: <Loading/>
// });


// const MyMarketOrders = loadable(() => import("../marketplace-functionalities/MyMarketOrders"),{
//   fallback: <Loading/>
// });

// const MarketOrderDetails = loadable(() => import("../marketplace-functionalities/MarketOrderDetails"),{
//   fallback: <Loading/>
// });



class Navigation2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: null
    }
    console.log("mode: ", this.props.mode)

    // this.handleClick = this.handleClick.bind(this)
    // this.switchResult = this.switchResult.bind(this)
  }

  // handleClick(e) {
  //   //e.preventDefault()
  //   //console.log(e.target.value);
  //   this.setState({
  //     state: e.target.id
  //   })
  // }

  // switchResult(_state, _mode) {
  //   console.log(_state, _mode)
  //   // TODO template the navigation

  //   if (_mode == "marketplace") {
  //     switch (_state) {
  //       case null:
  //         return (
  //           <div className="default">
  //             {/* <button id="MarketMake" onClick={this.handleClick}>Make a Market post</button> */}
  //             <a href="/marketplace/make/makesell">Make Sell request</a>
  //             <button id="MarketSee" onClick={this.handleClick}>See Existing Market posts</button>
  //           </div>
  //         )
  //       case "MarketSee":
  //         return (
  //           <div className="see">
  //             {/* <a href={`/marketplace/databases/buyordersdata`}>Market buy posts</a> */}
  //             <a href={`/marketplace/databases/sellordersdata`}>Market sell posts</a>
  //             <a href="/marketplace/databases/AllMyOrders">All my market posts</a>
  //             {/* <a href="/marketplace/databases/matches">Matches</a> */}
  //           </div>
  //         )
  //       default:
  //         return null
  //     }

  //   } else if (_mode == "orders") {
  //     switch (_state) {
  //       case null:
  //         return (
  //           <div className="default">
  //             <button id="Make" onClick={this.handleClick}>Make an order</button>
  //             <button id="See" onClick={this.handleClick}>See Existing orders</button>
  //           </div>
  //         )
  //       case "Make":
  //         return (
  //           <div className="make">
  //             <a href="/make/makebuy">Make a Buy Order</a>
  //             <a href="/make/makesell">Make a Sell Order</a>
  //           </div>
  //         )
  //       case "See":
  //         return (
  //           <div className="see">
  //             <a href={`/databases/buyordersdata`}>People Buying</a>
  //             <a href={`/databases/sellordersdata`}>People Selling</a>
  //             <a href="/databases/AllMyOrders">All my Orders</a>
  //             <a href="/databases/matches">Matches</a>
  //           </div>
  //         )
  //       default:
  //         return null
  //     }

  //   }

  // }

  render() {
    // let component = this.switchResult(this.state.state, this.props.mode);

    // console.log(this.state.state)
    return (
      <React.Fragment>


        <Link to='/marketplace/make/makesell'>Make Sell request</Link>
        <Link to='/marketplace/see/navigation'>See Existing Market posts</Link>


        <BrowserRouter>
          <Switch>
            <Route path="/marketplace/make/makesell" render={
              (props) => <MakeMarketOrder {...props} />
            } />

            <Route path="/marketplace/see/navigation" render={
              (props) => <InnerNavigation2 {...props} />
            } />

          </Switch>
        </BrowserRouter>
      </React.Fragment>
      )
  }
}

export default Navigation2