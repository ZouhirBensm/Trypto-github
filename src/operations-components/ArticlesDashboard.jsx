import React from 'react';
import { Link, BrowserRouter, Route, Switch, useRouteMatch} from 'react-router-dom';
import loadable from "@loadable/component";
import Loading from "../generic-components/Loading";


// import CreateArticle from './CreateArticle';
// import ArticleSelector from '../generic-components/ArticleSelector';
// import NotFound from '../generic-components/NotFound';
import Operations from '../root-spas/Operations';


const CreateArticle = loadable(() => import("../operations-components/CreateArticle"),{
  fallback: <Loading/>
});
const ArticleSelector = loadable(() => import("../generic-components/ArticleSelector"),{
  fallback: <Loading/>
});
const NotFound = loadable(() => import("../generic-components/NotFound"),{
  fallback: <Loading/>
});
// const Operations = loadable(() => import("../root-spas/Operations"),{
//   fallback: <Loading/>
// });

class ArticlesDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    this.createAnArticle = this.createAnArticle.bind(this)
  }

  // const {path, url} = useRouteMatch()


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
              <li><Link to='/operations/articles-dashboard/create-article'>Create an Article</Link></li>
              <li><Link to='/operations/articles-dashboard/article-selector'>Article Selector</Link></li>
              <li><Link to='/operations'>Back</Link></li>
            </ul>
          </Route>


          {/* 
          <Route path="/" render={
            (props) => <Operations {...props} test="test1"/>
          }/>  */}

          <Route path="/operations/articles-dashboard/create-article" render={
            (props) => <div>
              {"are we loading this?"}
              <CreateArticle {...props} test="test1"/>
              <Link to='/operations/articles-dashboard/'>Back</Link>
            </div>
          }/> 
          <Route path="/operations/articles-dashboard/article-selector" render={
            (props) => <div>
              <ArticleSelector {...props} test="test2"/>
              <Link to='/operations/articles-dashboard/'>Back</Link>
            </div>
          }/> 

          <Route exact path='/operations/'>
            <Operations/>
          </Route>
          <Route render={
            (props) => <div>
              <NotFound {...props} test="test2"/>
            </div>
          }/> 


          
          
          
          {/* <Route path='/operations/articles-dashboard/create-article'>
            <CreateArticle/>
            <Link to='/operations/articles-dashboard/'>Back</Link>
          </Route>
           <Route path='/operations/articles-dashboard/article-selector'>
            <ArticleSelector/>
            <Link to='/operations/articles-dashboard/'>Back</Link>
          </Route>
          <Route component={NotFound}/> */}




         </Switch>
        </BrowserRouter>
        
        


        {/* <div>
          <Link to="/"></Link>
          <button onClick={this.createAnArticle}>Create a new Article</button>
        </div> */}
        
        
        {/* <BrowserRouter basename='/operations/articles-dashboard'>
          <div>Hello this is the articles dashboard</div>
          <Link to="/create-article">Create an Article</Link>
          <Route path="/create-article" render={
            (props) => <CreateArticle {...props} test="test1"/>
          }/> 
          </BrowserRouter> */}
          {/* <ScrollToTop/>
          <Route exact path="/operations" render={
            (props) => <Admin_Block {...props} className="some-class" title="Some title"/>
          }/> 


          <Route path="/operations/articles-dashboard/create-article" component={CreateArticle}></Route>
            
          <Switch>
          </Switch> */}

      </React.Fragment>
    )
  }
}

export default ArticlesDashboard