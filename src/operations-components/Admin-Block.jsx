import React from 'react';
import '../style/reactDivMobile.css'

import { Link, BrowserRouter, Route, Switch} from 'react-router-dom';
import ScrollToTop from '../generic-components/ScrollToTop'


class Admin_Block extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <Link to={this.props.link}>
        <div className={`${this.props.className} wrapper`}>
          <h1>{this.props.title}</h1>
        </div>
      </Link>
    )
  }
}

export default Admin_Block