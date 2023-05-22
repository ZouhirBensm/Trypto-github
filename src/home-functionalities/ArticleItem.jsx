class ArticleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  
  render(){

    return (
      <React.Fragment>
        <h1>{this.props.article.title}</h1>
      </React.Fragment>
    )
  }
}

export default ArticleItem