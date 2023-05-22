import ArticlesMobileCarousel from './ArticlesMobileCarousel'

import './styles/GetRecentArticles.css'


class GetRecentArticles extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      articles: []
    }
    this.loadRecentArticles = this.loadRecentArticles.bind(this)
  }

  componentDidMount(){
    this.loadRecentArticles()
  }

  async loadRecentArticles(){
    let response

    response = await fetch(`/articles/recent-articles`)

    // console.log(response)
    
    let json
    json = await response.json()
    
    console.log(json)

    this.setState({
      articles: json.srv_
    })
  }

  render(){
    return (
      <React.Fragment>
        <div id="articles-main-component">
          <h1>Latest News</h1>
          <p>Get your latest news in the bitcoin and altcoin world from Bidblock. Plus read from insighful authors, that make your orange pill journey easier.</p>
          <a href="">See all</a>


          <ArticlesMobileCarousel
            articles={this.state.articles}
          />

        </div>
    </React.Fragment>
    )
  }
}

export default GetRecentArticles