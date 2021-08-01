
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import MakeBuy from './AppDep/MakeBuy';
import MakeSell from './AppDep/MakeSell';
import BuyOrders from './AppDep/BuyOrders';
import SellOrders from './AppDep/SellOrders';
import MyOrders from './AppDep/MyOrders';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Matches from './Matches';

class Databases extends Component {

  render() {
    return (
      
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Make an Order</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/databases/makebuy">Make a Buy Order</Nav.Link>         
              <Nav.Link href="/databases/makesell">Make a Sell Order</Nav.Link> 
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <BrowserRouter>           
          <Switch> 
            <Route exact path="/databases/makebuy" component={MakeBuy} />
            <Route exact path="/databases/makesell" component={MakeSell} />
          </Switch>     
        </BrowserRouter>

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">See existing Orders</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/databases/buyordersdata">People Buying</Nav.Link>         
              <Nav.Link href="/databases/sellordersdata">People Selling</Nav.Link>    
              <Nav.Link href="/databases/AllMyOrders">All my Orders</Nav.Link>      
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <BrowserRouter>           
          <Switch> 
            <Route exact path="/databases/buyordersdata" component={BuyOrders} />
            <Route exact path="/databases/sellordersdata" component={SellOrders} />
            <Route exact path="/databases/AllMyOrders" component={MyOrders} />
          </Switch>     
        </BrowserRouter>
      </div>
      
      
    )
  }
}

const element = <Databases />;

ReactDOM.render(element, document.getElementById('contents'));


