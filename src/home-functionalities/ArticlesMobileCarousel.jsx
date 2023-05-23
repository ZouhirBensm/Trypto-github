import './styles/ArticlesMobileCarousel.css'
import ArticleItem from './ArticleItem'


class ArticlesMobileCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.buildArticleCards = this.buildArticleCards.bind(this)

    this.myInterval

  }

  componentDidMount(){
    
    let counter = 0;
    let isScrollingForward = true;
    
    this.myInterval = setInterval(() => {
      
      console.log('scrolllll')

      var articleCarouselContainer = document.getElementById('article-carousel-container')
      var articleitems = document.getElementsByClassName('article-item')

      const articleitemWidth = articleitems[0].clientWidth
      const numberOfScrolls = articleitems.length - 1



      if (isScrollingForward) {
        articleCarouselContainer.scroll({
          left: articleCarouselContainer.scrollLeft + articleitemWidth,
          behavior: 'smooth'
        });
      } else {
        articleCarouselContainer.scroll({
          left: articleCarouselContainer.scrollLeft - articleitemWidth,
          behavior: 'smooth'
        });
      }

      counter++;


      if (counter === numberOfScrolls) {
        isScrollingForward = !isScrollingForward;
        counter = 0;
      }


    }, 5000)
  }


  componentWillUnmount() {
    clearInterval(this.myInterval);
  }


  buildArticleCards() {
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



  render() {

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