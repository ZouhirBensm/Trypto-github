// import React from "react"
import '../style/reactDivMobile.css'

import { Link, BrowserRouter, Route, Switch} from 'react-router-dom';

class ArticleSelector extends React.Component {
  render(){
    return (
      <React.Fragment>
        <div>Mock ArticleSelector component...</div>
        <a href="/operations/articles-dashboard">Back</a>
      </React.Fragment>
    )
  }
}

const element = <ArticleSelector />;

ReactDOM.render(element, document.getElementById('react-div'));

export default ArticleSelector