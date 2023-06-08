// import React from "react"
import '../style/reactDivMobile.css'
import './styles/ArticleSelector.css'

class ArticleSelector extends React.Component {
  render(){
    return (
      <React.Fragment>
        <a id='article-select-back' href="/operations/articles-dashboard">
          <img src="/img/SVG/operations/global/back.svg" alt="" />
        </a>
      </React.Fragment>
    )
  }
}

const element = <ArticleSelector />;

ReactDOM.render(element, document.getElementById('react-div'));

export default ArticleSelector