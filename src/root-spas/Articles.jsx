import loadable from "@loadable/component";
import React from "react";
// import Loading from "./Loading";
import Loading from "../generic-components/Loading";
import '../style/reactDivMobile.css'

// const Messages = loadable(() => import("../messenger-functionalities/Messages"),{
//   fallback: <Loading/>
// });

// import { BrowserRouter, Route, Switch} from 'react-router-dom';

class Articles extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      page: 1,
      limit: 3, //Limit per page defined here!
    }
  }

  componentDidMount(){
    //DOM is ready
    this.loadData()
  }

  async loadData(){
    let response = await fetch(`${process.env.ROOT}/articles/paginated-articles?page=${this.state.page}&limit=${this.state.limit}`)
    
    let serverOBJ = await response.json()

    if(response.ok){
      console.log("serverOBJ", serverOBJ)
    } else {
      console.error("Error: ", serverOBJ)
    }

  }

  render() {
    return (
      <React.Fragment>
        Articles.jsx
      </React.Fragment>
    )
  }
}

const element = <Articles />;

ReactDOM.render(element, document.getElementById('react-div'));

