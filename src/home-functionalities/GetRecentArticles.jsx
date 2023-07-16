import ArticlesMobileCarousel from './ArticlesMobileCarousel'

import './styles/GetRecentArticles.css'


class GetRecentArticles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
    }
    this.loadRecentArticles = this.loadRecentArticles.bind(this)
  }



  componentDidMount() {
    this.loadRecentArticles()
  }

  async loadRecentArticles() {
    let response

    response = await fetch(`/articles/paginated-articles/data?page=1&limit=5`, {
      method: 'GET',
    })

    let json
    json = await response.json()

    console.log(json)

    this.setState({
      articles: json.srv_.ARTICLES
    })


  }

  render() {
    return (
      <React.Fragment>
        <div id="articles-main-component" className='higher-level-div'>
          <div>
            <h1>Latest News</h1>
            <p>Get your latest news in the bitcoin and altcoin world from Bidblock. Plus read from insighful authors, that make your orange pill journey easier.</p>
            <a href="/articles">See all</a>
          </div>

          <br />
          <br />
          <br />
          <br />

          {/* <button onClick={(e) => { this.unmount(e) }}>Unmount</button>
          {this.state.renderrender ?
            <ArticlesMobileCarousel
              articles={this.state.articles}
            /> :
            null
          } */}

          <ArticlesMobileCarousel
            articles={this.state.articles}
          />

        </div>
      </React.Fragment>
    )
  }
}

export default GetRecentArticles