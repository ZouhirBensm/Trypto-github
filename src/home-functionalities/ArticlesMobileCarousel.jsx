
import './styles/ArticlesMobileCarousel.css'
import ArticleItem from './ArticleItem'





class ArticlesMobileCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      card_number_on: 0,
      sense: true
    }

    // this.buildArticleCards = this.buildArticleCards.bind(this)

    this.numberOfScrolls
    this.myInterval

    this.card_number_on_manager = this.card_number_on_manager.bind(this)
    // this.next = this.next.bind(this)
    // this.previous = this.previous.bind(this)

  }







  card_number_on_manager(rightLeft) {



    var articleCarouselContainer = document.getElementById('article-carousel-container')
    var articleitems = document.getElementsByClassName('article-item')


    if (articleitems.length == 0) return


    // SCROLL WIDTH
    const articleitemWidth = articleitems[0].clientWidth
    // NUMBER MAX OF ALLOWED SCROLLS
    const numberOfScrolls = articleitems.length - 1
    this.numberOfScrolls = numberOfScrolls


    if (rightLeft) {

      articleCarouselContainer.scroll({
        left: articleCarouselContainer.scrollLeft + articleitemWidth,
        behavior: 'smooth'
      });

      this.setState(prevState => ({
        card_number_on: ++prevState.card_number_on,
      }))

    } else {

      articleCarouselContainer.scroll({
        left: articleCarouselContainer.scrollLeft - articleitemWidth,
        behavior: 'smooth'
      });

      this.setState(prevState => ({
        card_number_on: --prevState.card_number_on,
      }))

    }



    if(

      (this.state.sense && (this.state.card_number_on == this.numberOfScrolls)) 
      || 
      (!this.state.sense && (this.state.card_number_on == 0))

      ){

        this.setState(prevState => ({
          sense: !prevState.sense,
        }))

      }




  }




  componentDidUpdate(prevProps, prevState) {

    var articleCarouselContainer = document.getElementById('article-carousel-container')
    var articleitems = document.getElementsByClassName('article-item')


    if (articleitems.length == 0 && this.myInterval) return

    const numberOfScrolls = articleitems.length - 1
    this.numberOfScrolls = numberOfScrolls



    if (this.myInterval) return


    this.myInterval = setInterval(() => {
      // console.log(this.state.card_number_on)

      this.card_number_on_manager(this.state.sense)

    }, 5000)

  }





  componentWillUnmount() {

    console.log("Unmounting component! 1", this.myInterval)

    clearInterval(this.myInterval);

    console.log("Unmounting component! 2", this.myInterval)
  }




  render() {
    const isPreviousButtonDisabled = this.state.card_number_on === 0;
    const isNextButtonDisabled = this.state.card_number_on === this.numberOfScrolls

    return (
      <React.Fragment>
        <div id='absolute-container'>

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
              disabled={isPreviousButtonDisabled}
              // className={isPreviousButtonDisabled ? "disabled-button" : "enabled-button"}
              style={isPreviousButtonDisabled ? {opacity: 0.4} : null}
              onClick={(e) => {
                this.previous(e)
              }}></button>
            <button
              disabled={isNextButtonDisabled}
              style={isNextButtonDisabled ? {opacity: 0.4} : null}
              // className={isNextButtonDisabled ? "disabled-button" : "enabled-button"}
              value='next' onClick={(e) => {
                this.next(e)
              }}></button>
          </div>

        </div>
        
      </React.Fragment>
    )
  }




  next() {
    if(this.state.sense && (this.state.card_number_on == this.numberOfScrolls-1)) {

        this.setState(prevState => ({
          sense: false,
        }))
        return
      }

      this.card_number_on_manager(true)
      
  }


  previous() {

    if(!this.state.sense && (this.state.card_number_on == 0 +1)) {

      this.setState(prevState => ({
        sense: true,
      }))
      return
    }

    this.card_number_on_manager(false)
  }



}

export default ArticlesMobileCarousel