import './styles/ArticleItem.css'
import { THIRD_PARTY_SOURCES, EXTERNAL_READS_SOURCES } from '../../full-stack-libs/utils.arrays'

class ArticleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // onpage: false
    }
  }

  


  
  render(){


    let enclosure
    let url

    if (EXTERNAL_READS_SOURCES.includes(this.props.article.source)) {
      enclosure = this.props.article.enclosure
      url = this.props.article.url
    } else {
      enclosure = `img/bidblock-article-enclosure-images/${this.props.article.articleenclosureimage_id.image.name}`
      url = this.props.article.articleheadtag_id.url
    }



    return (
      <React.Fragment>
        <div className="article-item" id={`card-${this.props.card_number}`}>
          <a href={url} target="_blank">
            <div className='inner-article-item'>
              <div>
                <h1>{this.props.article.h1}</h1>
                <span>{this.props.article.excerpt}</span>
              </div>
              <img src={enclosure} alt="" />
            </div>
          </a>

        </div>
      </React.Fragment>
    )
  }
}

export default ArticleItem