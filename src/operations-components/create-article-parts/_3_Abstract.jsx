
class _3_Abstract extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }






  render() {
    return (
      <React.Fragment>
        <h3>Set the Article's abstract</h3>

        <div id="create-article-form-id" className="form">


          <label>Abstract's name type</label>

          <input type="text" name="abstract_name_type" value={this.props.abstract_name_type} onChange={this.props.handleChange} placeholder="e.g. Resume, Summary, Abstract, ..." required />




          <label>Abstract's points</label>
          <span>seperate points with <pre>',  '</pre> to take effect</span><br />
          <span>utilise <pre>[]</pre> to indicate strong parts of text</span>

          <input id="editor" type="text" name="abstract_points" onChange={this.props.handleChange} placeholder="Enter wanted points" value={this.props.abstract_points.join(',  ').replace(/<strong>/g, '[').replace(/<\/strong>/g, ']')} required />


          <div className="input-with-tags">
            {this.props.abstract_points.map((abstract_point, index) => {
              if (!abstract_point) { return }
              // const text = abstract_point;
              // const formattedText = text.replace('[', '<strong>').replace(']', '</strong>');

              return <React.Fragment key={index}>
                <span className="tag">
                  {/* {formattedText} */}
                  <span dangerouslySetInnerHTML={{ __html: abstract_point }}></span>
                </span>
              </React.Fragment>
            })}
          </div>











        </div>





        <div id='nav'>
          <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
          <button onClick={(e) => this.props.previousStep()}>Previous </button>

          <button onClick={(e) => {
            const isValid = this.props.validateInputs(e)
            console.log({ isValid })
            if (!isValid) return
            this.props.nextStep(e)
            return

          }}>Proceed</button>
          <img src="/img/SVG/operations/create-article/proceed.svg" alt="" />
        </div>



      </React.Fragment>
    )
  }
}

export default _3_Abstract