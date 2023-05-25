
import './styles/ArticlesMobileCarousel.css'
import ArticleItem from './ArticleItem'





class ArticlesMobileCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      card_number_on: 0,
      counter: 0,
      isScrollingForward: true,
    }

    // this.buildArticleCards = this.buildArticleCards.bind(this)

    this.numberOfScrolls
    this.myInterval

    this.card_number_on_manager = this.card_number_on_manager.bind(this)
    // this.next = this.next.bind(this)
    // this.previous = this.previous.bind(this)

  }







  card_number_on_manager(directionRight = undefined) {



    var articleCarouselContainer = document.getElementById('article-carousel-container')
    var articleitems = document.getElementsByClassName('article-item')


    if (articleitems.length == 0) return


    // SCROLL WIDTH
    const articleitemWidth = articleitems[0].clientWidth
    // NUMBER MAX OF ALLOWED SCROLLS
    const numberOfScrolls = articleitems.length - 1
    this.numberOfScrolls = numberOfScrolls


    console.log('scrolllll')

    if (directionRight || this.state.isScrollingForward) {

      articleCarouselContainer.scroll({
        left: articleCarouselContainer.scrollLeft + articleitemWidth,
        behavior: 'smooth'
      });

      this.setState({
        card_number_on: ++this.state.card_number_on,
      })

    } else {

      articleCarouselContainer.scroll({
        left: articleCarouselContainer.scrollLeft - articleitemWidth,
        behavior: 'smooth'
      });

      this.setState({
        card_number_on: --this.state.card_number_on,
      })

    }

    this.setState({
      counter: ++this.state.counter
    })


    if (this.state.counter === this.numberOfScrolls) {

      this.setState({
        isScrollingForward: !this.state.isScrollingForward,
        counter: 0,
      })
    }


  }




  componentDidUpdate(prevProps, prevState) {


    if (this.myInterval) return


    // this.myInterval = setInterval(() => this.card_number_on_manager(), 7000)

  }





  componentWillUnmount() {

    console.log("Unmounting component! 1", this.myInterval)

    clearInterval(this.myInterval);

    console.log("Unmounting component! 2", this.myInterval)
  }




  render() {

    return (
      <React.Fragment>
        <div id='article-carousel-container'>

          {this.props.articles.map((article, i) => (
            <ArticleItem
              key={article._id}
              card_number={i}
              article={article}
            />
          ))}

        </div>
        <div id='article-nav'>
          <button value='previous'
            disabled={this.state.card_number_on === 0}
            onClick={(e) => {
              this.previous(e)
            }}>Previous</button>
          <button
            disabled={this.state.card_number_on === this.numberOfScrolls}
            value='next' onClick={(e) => {
              this.next(e)
            }}>Next</button>
        </div>
      </React.Fragment>
    )
  }




  next() {
    this.card_number_on_manager(true)
  }

  previous() {
    this.card_number_on_manager(false)
  }
}

export default ArticlesMobileCarousel