import React from "react"

class AllArticlesList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    this.contructArticleList()
  }

  contructArticleList(){
    if(this.props.articles){
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
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return(
      <div>
        <h4>{this.props.title}</h4>
        <span>{this.props.category}</span>
        <p>{this.props.content}</p>
      </div>
    );
  }
}


export default AllArticlesList