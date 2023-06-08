// import './styles/ArticlesDashboard.css'

import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
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
              <ul className='operation-ul'>
                <li>
                  <a href='/operations/create-article'>Create an Article</a>
                  <img src="/img/SVG/operations/articles-dashboard/proceed.svg" alt="" />
                </li>
                <li>
                  <a href='/operations/article-selector'>Article Selector</a>
                  <img src="/img/SVG/operations/articles-dashboard/proceed.svg" alt="" />
                </li>
                <li>
                  <Link to='/operations'>
                    <img src="/img/SVG/operations/global/back.svg" alt="" />
                  </Link>
                </li>
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