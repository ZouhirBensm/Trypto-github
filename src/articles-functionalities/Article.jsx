import DOMPurify from 'dompurify';
import './style/Article.css'

class Article extends React.Component {
  constructor(props){
    super(props)
    const queryParams = new URLSearchParams(this.props.location.search)

    this.state = {}

    const articleDataJSON = queryParams.get("article")
    console.log(articleDataJSON)

    this.articleDataObj = JSON.parse(articleDataJSON)
    console.log(this.articleDataObj)
  }

  
  render(){

    const date = new Date(this.articleDataObj.publishedDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);


    const sanitizedContent = DOMPurify.sanitize(this.articleDataObj.content);

    return (
      <React.Fragment>
        <div id="article-banner">

          <img src={`${this.articleDataObj.enclosure}`} alt="Blog image banner" />

          <div id="article-data">
            <h1>{this.articleDataObj.title}</h1>
            <span>{this.articleDataObj.category}</span>
            <span>{formattedDate}</span>
          </div>

        </div>

        <p dangerouslySetInnerHTML={{__html: sanitizedContent}} />
      </React.Fragment>
    )
  }
}

export default Article