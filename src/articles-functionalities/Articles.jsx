import loadable from "@loadable/component";
import React from "react";
// import Loading from "./Loading";
import Loading from "../generic-components/Loading";
import PageSelector from '../generic-components/PageSelector';
import AllArticlesList from '../articles-functionalities/AllArticlesList';
import '../style/reactDivMobile.css'

// const Messages = loadable(() => import("../messenger-functionalities/Messages"),{
//   fallback: <Loading/>
// });

// import { BrowserRouter, Route, Switch} from 'react-router-dom';

class Articles extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      articles: [],
      page: 1,
      limit: 3, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      number_of_pages: 1,
      on_off_limit_next: false,
      on_off_limit_previous: true,
    }
    console.log("in the child component:", this.props.category)
    this.controls = this.controls.bind(this);
  }

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      this.loadData()
    })
  }

  componentDidMount(){
    //DOM is ready
    this.loadData()
  }

  async loadData(){
    let response = await fetch(`${process.env.ROOT}/articles/data/paginated-articles?page=${this.state.page}&limit=${this.state.limit}&category=${this.props.category}`)
    
    let serverOBJ = await response.json()

    // console.log(response)
    // console.log(serverOBJ)

    if(response.ok){
      console.log("serverOBJ", serverOBJ)
      this.setState({
        articles: serverOBJ.srv_.ARTICLES,
        nextPage: serverOBJ.srv_.next,
        previousPage: serverOBJ.srv_.previous,
        number_of_pages: serverOBJ.srv_.number_of_pages.number
      }, () => {
        if(this.state.nextPage==undefined){
          this.setState({
            on_off_limit_next: true
          })
        } else {
          this.setState({
            on_off_limit_next: false
          })
        }
        if(this.state.previousPage==undefined){
          this.setState({
            on_off_limit_previous: true
          })
        } else {
          this.setState({
            on_off_limit_previous: false
          })
        }
      })
    } else {
      console.error("Error: ", serverOBJ)
    }

  }

  render() {
    console.log("Here articles!: ", this.state.articles)
    return (
      <React.Fragment>
        {/* <div>Articles.jsx test</div> */}

        <div className="wrapper">
          Articles.jsx
          <AllArticlesList
            articles={this.state.articles}
          />
          <PageSelector
            number_of_pages={this.state.number_of_pages} 
            page={this.state.page} 
            on_off_limit_previous={this.state.on_off_limit_previous} 
            on_off_limit_next={this.state.on_off_limit_next} 
            previousPage={this.state.previousPage} 
            nextPage={this.state.nextPage} 
            controls={this.controls}
          />
        </div>
      </React.Fragment>
    )
  }
}

// const element = <Articles />;

// ReactDOM.render(element, document.getElementById('react-div'));

export default Articles







