import './styles/_2_SetArticleBodyHeader.css'


class _2_SetArticleBodyHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  render() {
    return (
      <React.Fragment>
        <h3>Set Article's body header tag data:</h3>

        <form id="create-article-form-id" className="form">
          <label>Set wanted Article keywords</label>


          <div className="input-with-tags">
            {this.props.keywords.map((keyword, index) => {
              if (!keyword) {return}
              return <React.Fragment>
                <span className="tag" key={index}>
                  {keyword}
                </span>
              </React.Fragment>
            })}
            <input type="text" name="keywords" onChange={this.props.handleChange2} placeholder="Enter wanted Keywords" value={this.props.keywords.join(', ')} />
          </div>

          <label>Set Article's category (database), genre (schema), and about (schema)</label>

          <label>Upload A Banner Image</label>

          <label>Set Banner Image Alternate text</label>

          <label>Set Article's H1</label>


        </form>

        <div id='nav'>
          <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
          <button onClick={(e) => this.props.previousStep()}>Previous </button>

          <button onClick={(e) => this.props.nextStep()}>Proceed</button>
          <img src="/img/SVG/operations/create-article/proceed.svg" alt="" />
        </div>


      </React.Fragment>
    )
  }
}

export default _2_SetArticleBodyHeader