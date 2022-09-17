import React from "react"
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";
import {THIRD_PARTY_CATEGORIES, EXTERNAL_READS_CATEGORIES} from '../../full-stack-libs/utils.arrays'
import './style/AllArticlesList.css'

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

  componentDidMount(){
    console.log("ELEMENT CATEGORY!", this.props.article.category)
  }

  render() {

    console.log(this.props.article)
    let stringy = JSON.stringify(this.props.article)
    console.log(stringy)

    console.log(!EXTERNAL_READS_CATEGORIES.includes(this.props.article.category))

    return (
      <React.Fragment>
        {/* <Link className='link' to={{
          pathname: `/articles/individual_article/${this.props.article._id}`,
          search: `?article=${JSON.stringify(this.props.article)}`,
        }}>
          <div>
            <hr/>
            <h4>{this.props.article.title}</h4>
            <span>{this.props.article.publishedDate}</span> | <span>{this.props.article.category}</span>
            <p>{this.props.article.excerpt}</p>
            <hr/>
          </div>
        </Link> */}

        {!EXTERNAL_READS_CATEGORIES.includes(this.props.article.category)? 
        <Link className='link' to={{
          pathname: `/articles/individual_article/${this.props.article._id}`,
          search: `?article=${JSON.stringify(this.props.article)}`,
        }}>
          <div>
            <hr/>
            <h4>{this.props.article.title}</h4>
            <span>{this.props.article.publishedDate}</span> | <span>{this.props.article.category}</span>
            <p>{this.props.article.excerpt}</p>
            <hr/>
          </div>
        </Link>
        :
        <a className='alink' href={this.props.article.link} target="_blank">
          <div>
            <hr/>
            <h4>{this.props.article.title}</h4>
            <span>{this.props.article.publishedDate}</span> | <span>{this.props.article.category}</span>
            <p>{this.props.article.excerpt}</p>
            <hr/>
          </div>
        </a>
        }


        {/* <Route path={`/articles/individual_article/${this.props.article._id}`} component={Article}/> */}
      </React.Fragment>

    );
  }
}


export default AllArticlesList