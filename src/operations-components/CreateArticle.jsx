import React from 'react';
import '../style/reactDivMobile.css'

import { Link, BrowserRouter, Route, Switch} from 'react-router-dom';
import ScrollToTop from '../generic-components/ScrollToTop'


class CreateArticle extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <React.Fragment>
        <div>This is where we create articles... {this.props.test}</div>
        {/* <Link to='/'>Back</Link> */}
      </React.Fragment>
    )
  }
}

export default CreateArticle