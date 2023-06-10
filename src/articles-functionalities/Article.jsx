import DOMPurify from 'dompurify';
import './style/Article.css'

import {efcewc} from '../../full-stack-libs/utils'

class Article extends React.Component {
  constructor(props){
    super(props)


    // const queryParams = new URLSearchParams(this.props.location.search)

    this.state = {
      article: undefined
    }

    this.loadArticle = this.loadArticle.bind(this)

    // const articleDataJSON = queryParams.get("article")
    // console.log(articleDataJSON)

    // this.articleDataObj = JSON.parse(articleDataJSON)
    // console.log(this.articleDataObj)
  }

  componentDidMount(){
    this.loadArticle()
  }
  
  async loadArticle() {
    let response

    let _article_title = this.props.match.params.article_title || article_title
  
    response = await fetch(`/articles/data/${_article_title}`)
  
  
    const contentType = response.headers.get('Content-Type')
    // console.log(contentType)
  
    let json
    if (contentType && contentType.includes('application/json')) {
      json = await response.json()
    }
  
    if (response.status !== 200) {
      // let err = 'Response not 200 and not in JSON format.'
      // if (json) err = json.error.message
      // console.error(err)
      // return
    }
  
    this.setState({ article: json.article })
    return

  }
  
  render(){

    // const date = new Date(this.articleDataObj.publishedDate);
    // const options = { day: 'numeric', month: 'long', year: 'numeric' };
    // const formattedDate = date.toLocaleDateString('en-US', options);


    // const sanitizedContent = DOMPurify.sanitize(this.articleDataObj.content);

    const date = new Date(this.state.article?.publishedDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);


    const sanitizedContent = DOMPurify.sanitize(this.state.article?.content);

    return (
      <React.Fragment>
        <div id="article-banner">

          <img src={`${this.state.article?.enclosure}`} alt="Blog image banner" />

          <div id="article-data">
            <h1>{this.state.article?.title}</h1>
            <span>{this.state.article?.category}</span>
            <span>{formattedDate}</span>
          </div>

        </div>

        <p dangerouslySetInnerHTML={{__html: sanitizedContent}} />
      </React.Fragment>
    )
  }
}

export default Article