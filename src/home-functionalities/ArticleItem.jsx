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

    if (EXTERNAL_READS_SOURCES.includes(this.props.article.source)) {
      enclosure = this.props.article.enclosure
    } else {
      enclosure = `img/bidblock-article-enclosure-images/${this.props.article.articleenclosureimage_id.image.name}`
    }



    return (
      <React.Fragment>
        <div className="article-item" id={`card-${this.props.card_number}`}>
          <a href={this.props.article.url} target="_blank">
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