
import loadable from "@loadable/component";
import Loading from "./Loading";
// import ReactDOM from 'react-dom'
// import React from 'react'


const LoadableComponent = loadable(() => import("./App"), {
  fallback: <Loading />
});


class Home extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
const element = <Home />;

ReactDOM.render(element, document.getElementById('react-div'));

export default Home

// https://v5.reactrouter.com/web/guides/code-splitting
