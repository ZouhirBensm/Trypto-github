import './styles/ArticlesMobileCarousel.css'
import ArticleItem from './ArticleItem'


class ArticlesMobileCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.buildArticleCards = this.buildArticleCards.bind(this)
  }

  buildArticleCards(){
    let articleItemsArr
    if (this.props.articles) {
      articleItemsArr = this.props.articles.map((article, i) => {
        return <ArticleItem
          key={article._id}
          article={article}
        />
      })
      return articleItemsArr
    } else {
      const msg = `this.props.articles resolved to a false for some reason`
      console.error(msg)
      return
    }
  }


  
  render(){

    const articleItemsArr = this.buildArticleCards()

    return (
      <React.Fragment>
        <div id='article-carousel-container'>
          {articleItemsArr}
        </div>
      </React.Fragment>
    )
  }
}

export default ArticlesMobileCarousel