import './styles/ArticleItem.css'

class ArticleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.myInterval
    
  }

  static staticMethod() {
    // Static method logic
    console.log('This is a static method');

    var articleCarouselContainer = document.getElementById('article-carousel-container')
    var articleitems = document.getElementsByClassName('article-item')

    console.log(articleitems)
    
    let counter = 0;
    let isScrollingForward = true;
    
    this.myInterval = setInterval(() => {
      
      console.log('scrolllll')


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


  
  render(){

    return (
      <React.Fragment>
        <div className="article-item">
          <div className='inner-article-item'>
            <div>
              <h1>{this.props.article.title}</h1>
              <span>{this.props.article.excerpt}</span>
            </div>
            <img src={this.props.article.enclosure} alt="" />
          </div>

        </div>
      </React.Fragment>
    )
  }
}

export default ArticleItem