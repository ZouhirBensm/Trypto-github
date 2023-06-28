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


  contructArticleList() {
    if (this.props.articles) {
      let AllArticlesElements = this.props.articles.map((article, i) => {
        return <ArticleElement
          key={i}
          article={article}
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
    }
  }


  render() {

    console.log('this.props.article->\n', this.props.article)
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

    return (

      <React.Fragment>
        <div className="article-card">
          <div className="article-preview">
            <img src={enclosure} alt="Blog image banner" />
            <span>{formattedDate}</span>
            <div>
              <h4>{this.props.article.h1}</h4>
              
              {this.props.article.excerpt ? 
              <p>{this.props.article.excerpt}</p> :
              null
              }
            </div>
          </div>


          <a className='link' href={this.props.article.url} target={EXTERNAL_READS_SOURCES.includes(this.props.article.source)? "_blank": null}>
            Read more
          </a>

        </div>


        {/* <Route path={`/articles/individual_article/${this.props.article._id}`} component={Article}/> */}
      </React.Fragment>

    );
  }
}






export default AllArticlesList