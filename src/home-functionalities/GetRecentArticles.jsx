class GetRecentArticles extends React.Component {
  constructor(){
    super()
    this.state = {
      articles: undefined
    }
    this.loadRecentArticles = this.loadRecentArticles.bind(this)
  }

  componentDidMount(){
    this.loadRecentArticles()
  }

  async loadRecentArticles(){
    let response

    response = await fetch(`/articles/recent-articles`)

    console.log(response)
    
    let json
    json = await response.json()
    
    console.log(json)
    return 
  }

  render(){
    return (
      <React.Fragment>
        <div>GetRecentArticles...</div>
    </React.Fragment>
    )
  }
}

export default GetRecentArticles