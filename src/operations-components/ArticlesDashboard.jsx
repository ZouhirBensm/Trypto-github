import React from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";
import Operations from '../root-spas/Operations';


class ArticlesDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (

      <React.Fragment>

        <BrowserRouter>
          <Switch>
            <Route exact path='/operations/articles-dashboard/'>
              <ul>
                <li><a href='/operations/create-article'>Create an Article</a></li>
                <li><a href='/operations/article-selector'>Article Selector</a></li>
                <li><Link to='/operations'>Back</Link></li>
              </ul>
            </Route>

            <Route path="/operations" render={
              (props) => <Operations {...props} />
            } />

          </Switch>
        </BrowserRouter>
      </React.Fragment>



    )
  }
}

const element = <ArticlesDashboard />

ReactDOM.render(element, document.getElementById('react-div'));



export default ArticlesDashboard