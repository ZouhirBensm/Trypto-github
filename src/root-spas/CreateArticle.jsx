// import React from 'react';
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
        <div>This is where we create articles... </div>
        <a href="/operations/articles-dashboard">Back</a>
      </React.Fragment>
    )
  }
}

const element = <CreateArticle />;

ReactDOM.render(element, document.getElementById('react-div'));

export default CreateArticle