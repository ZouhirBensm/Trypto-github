import React from 'react';
import { Link, BrowserRouter, Route, Switch} from 'react-router-dom';
import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";

// import NotFound from '../generic-components/NotFound';
import Operations from '../root-spas/Operations';

const NotFound = loadable(() => import("../generic-components/NotFound"),{
  fallback: <Loading/>
});


class ArticlesDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    console.log("AAARREE WEEE HERE!!!!")
    this.createAnArticle = this.createAnArticle.bind(this)
  }

  // const {path, url} = useRouteMatch()
  componentDidUpdate(){
    console.log('reload')
  }


  createAnArticle(){
    console.log("creating a new article...")
    // api call to create a new article!
  }

  render(){
    console.log("are we rendering this???")
    return (

      <React.Fragment>

        <BrowserRouter>
        <Switch> 
          <Route exact path='/operations/articles-dashboard/'>
          <ul>
            <li><a href='/operations/create-article'>Create an Article</a></li>
            <li><a href='/operations/article-selector'>Article Selector</a></li>
            {/* <li><a href='/operations'>Back a</a></li> */}
            <li><Link to='/operations'>Back</Link></li>
          </ul>
          </Route>

          <Route path="/operations" render={
            (props) => <Operations {...props}/>
          }/> 

         </Switch>
        </BrowserRouter>
      </React.Fragment>

        
      
    )
  }
}

const element = <ArticlesDashboard/>

ReactDOM.render(element, document.getElementById('react-div'));



export default ArticlesDashboard