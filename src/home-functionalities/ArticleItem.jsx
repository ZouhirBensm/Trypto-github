import './styles/ArticleItem.css'

class ArticleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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