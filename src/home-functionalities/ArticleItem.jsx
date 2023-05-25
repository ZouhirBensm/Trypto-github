import './styles/ArticleItem.css'
import { isInViewport } from '../../full-stack-libs/utils'

class ArticleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // onpage: false
    }
  }

  


  
  render(){

    return (
      <React.Fragment>
        <div className="article-item" id={`card-${this.props.card_number}`}>
          <a href={this.props.article.link} target="_blank">
            <div className='inner-article-item'>
              <div>
                <h1>{this.props.article.title}</h1>
                <span>{this.props.article.excerpt}</span>
              </div>
              <img src={this.props.article.enclosure} alt="" />
            </div>
          </a>

        </div>
      </React.Fragment>
    )
  }
}

export default ArticleItem