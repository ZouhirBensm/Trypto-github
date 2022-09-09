

class Article extends React.Component {
  constructor(props){
    super(props)
    const queryParams = new URLSearchParams(this.props.location.search)

    this.state = {
    }

    const articleDataJSON = queryParams.get("article")

    this.articleDataObj = JSON.parse(articleDataJSON)
    console.log(this.articleDataObj)
  }
  render(){
    return (
      <div>
        <h3>Title:</h3>
        <p>{this.articleDataObj.title}</p>
        <h4>Category:</h4>
        <p>{this.articleDataObj.category}</p>
        <h5>content:</h5>
        <p>{this.articleDataObj.content}</p>
      </div>
    )
  }
}

export default Article