import { Link } from "react-router-dom";
import { THIRD_PARTY_SOURCES, EXTERNAL_READS_SOURCES } from '../../full-stack-libs/utils.arrays'
import './style/AllArticlesList.css'

// TODO !!!! make loading a spinner at the center of the application or reactdiv div
// TODO !!!! While articles are loading load the loading component in the meantime

class AllArticlesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.contructArticleList()
  }

  componentDidUpdate(){
    console.log("!!!!!!")
  }


  contructArticleList() {
    if (this.props.articles) {
      let AllArticlesElements = this.props.articles.map((article, i) => {
        return <ArticleElement
          key={i}
          article={article}
          button_text={this.props.button_text}
          delete_button={this.props.delete_button}
          
        />
      })
      return AllArticlesElements
    } else {
      console.error(`this.props.articles resolved to a false for some reason`)
      return null
    }
  }

  render() {
    let AllArticlesElements = this.contructArticleList()

    return (
      <React.Fragment>
        <div className="wrapper-all-article-elements">
          {AllArticlesElements}
        </div>

      </React.Fragment>
    );
  }

}


class ArticleElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: null
    }
    this.buttonRef = React.createRef();
    console.log('this.props.article->\n', this.props.article)
    this.deleteArticle = this.deleteArticle.bind(this)
  }


  deleteArticle = async (e, _article_id) => {
    e.preventDefault()
    this.setState({ loading: true, error: null });

    // console.log("Clicked! Delete article", e, _article_id)

    let response

    try {
      response = await fetch(`/operations/article-delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          article_id: _article_id
        })
      })
  
      console.log(response)
  
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
  
      
      this.setState({ loading: false });
  
      return
      
    } catch (error) {
      console.error('Error deleting article:', error);
      this.setState({ error: 'An error occurred while deleting the article', loading: false }, ()=>{
        setTimeout(()=>{this.setState({ error: null })}, 4000)
      });
    }



  }

  componentDidMount(){

    switch (this.props.button_text) {
      case 'edit':
        this.buttonRef.current = <a className='link' href={`/operations/create-article?articleID_to_preload_4_edit=${this.props.article._id}`}>
        {this.props.button_text}
      </a>
        break;
      case 'read more':
        this.buttonRef.current = <a className='link' href={this.props.article.url} target={EXTERNAL_READS_SOURCES.includes(this.props.article.source)? "_blank": null}>
        {this.props.button_text}
      </a>
        break;
      default:
        // this.buttonRef.current = <div>TEST</div>
        break;
    }

  }


  render() {

    
    // let stringy = JSON.stringify(this.props.article)

    const date = new Date(this.props.article.publishedDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    let enclosure

    if (EXTERNAL_READS_SOURCES.includes(this.props.article.source)) {
      enclosure = this.props.article.enclosure
    } else {
      enclosure = this.props.article.articleenclosureimage_id.path
    }

    console.log('this.props.delete_button: ', this.props.delete_button)

    const { loading, error } = this.state;
    return (

      <React.Fragment>
        
        {error && <span id="error">Error: {error}</span>}

        <div className="article-card">
          <div className="article-preview">
            <img id="full-view" src={enclosure} alt="Blog image banner" />
            {
              this.props.delete_button ?
              <button onClick={(e) => this.deleteArticle(e, this.props.article._id)}>
                
                {loading ? <div className="spinner"></div> : <img src="/img/SVG/operations/global/trash.svg " alt="" /> }
              </button>
              :
              null
            }
            <span id="date">{formattedDate}</span>
            <div>
              <h4>{this.props.article.h1}</h4>
              
              {this.props.article.excerpt ? 
              <p>{this.props.article.excerpt}</p> :
              null
              }
            </div>
          </div>


          {this.buttonRef.current}




        </div>


        {/* <Route path={`/articles/individual_article/${this.props.article._id}`} component={Article}/> */}
      </React.Fragment>

    );
  }
}






export default AllArticlesList