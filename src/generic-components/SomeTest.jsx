import React from 'react';
import '../style/reactDivMobile.css'

import { Link, BrowserRouter, Route, Switch} from 'react-router-dom';
import ScrollToTop from '../generic-components/ScrollToTop'


class SomeTest extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <React.Fragment>
        <div>Some Test component</div>
      </React.Fragment>
    )
  }
}

export default SomeTest