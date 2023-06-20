
class _3_Abstract extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  applyStrong() {
    var editor = document.getElementById("editor");
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var strongElement = document.createElement("strong");
    strongElement.innerHTML = range.toString();
    range.deleteContents();
    range.insertNode(strongElement);
  }

  



  render() {
    return (
      <React.Fragment>
        <div>Set the Article's abstract</div>

        <form id="create-article-form-id" className="form">


          <label>Abstract's name type</label>

          <input type="text" name="abstract_name_type" value={this.props.abstract_name_type} onChange={this.props.handleChange} placeholder="e.g. Resume, Summary, Abstract, ..." required />




          {/* <label>Abstract's points</label>

          <input type="text" name="abstract_points" onChange={this.props.handleChange2} placeholder="Enter wanted points" value={this.props.keywords.join(', ')} required/>

          <div className="input-with-tags">
            {this.props.keywords.map((keyword, index) => {
              if (!keyword) {return}
              return <React.Fragment key={index}>
                <span className="tag">
                  {keyword}
                </span>
              </React.Fragment>
            })}
          </div> */}








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

export default _3_Abstract