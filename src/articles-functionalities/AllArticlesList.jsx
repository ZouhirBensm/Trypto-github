import React from "react"
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";

class AllArticlesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // this.contructArticleList()
  }

  contructArticleList() {
    console.log(this.props.articles)
    if (this.props.articles) {
      let AllArticlesElements = this.props.articles.map((article, i) => {
        return <ArticleElement
          title={article.title}
          content={article.content}
          category={article.category}
          key={i}
          article={article}
        />
      })
      return AllArticlesElements
    } else {
      console.error(`this.props.articles resolved to a false for some reason`)
      return null
    }
  }

  render() {
    let AllArticlesElements = this.contructArticleList()

    return (
      <React.Fragment>
        <h1>AllArticlesList</h1>
        <div className="wrapper-all-article-elements">
          {AllArticlesElements}
        </div>

      </React.Fragment>
    );
  }

}


class ArticleElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <React.Fragment>


        <Link to={{
          pathname: `/articles/individual_article/${this.props.article._id}`,
          search: `?article=${JSON.stringify(this.props.article)}`,
        }}>
          <div>
            <h4>{this.props.title}</h4>
            <span>{this.props.category}</span>
            <p>{this.props.content}</p>
          </div>
        </Link>

        {/* <Route path={`/articles/individual_article/${this.props.article._id}`} component={Article}/> */}
      </React.Fragment>

    );
  }
}


export default AllArticlesList