import './styles/_1_SetArticleHeadTagData.css'


class _1_SetArticleHeadTagData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.validateInputs = this.validateInputs.bind(this)
  }

    
  validateInputs(e) {
    const inputs = document.getElementsByTagName('input');
    let isValid = true;
  
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.required && !input.checkValidity()) {
        // Input is invalid, trigger validation error message
        input.reportValidity();
        isValid = false;
        break
      }
    }
  
    if (isValid) {
      // All inputs are valid, perform desired action
      console.log('VALID');
      return true;
    } else {
      return false;
    }
  }
  



  render() {

    const lr_noindex = this.props.noindex ? "flex-start" : "flex-end"
    const lr_nofollow = this.props.nofollow ? "flex-start" : "flex-end"


    return (
      <React.Fragment>
        <h3>Set Article's head tag data:</h3>

        <form id="create-article-form-id" className="form">
          <label>HTML Title, title tag:</label>

          <input type="text" name="html_title" value={this.props.html_title} onChange={this.props.handleChange} placeholder="Enter wanted HTML Title" required/>

          <label>Article's meta description:</label>

          <input type="text" name="meta_description" value={this.props.meta_description} onChange={this.props.handleChange} placeholder="Enter wanted meta description" required/>

          <label>Custom article canonical:</label>

          <input type="text" name="canonical" value={this.props.canonical} onChange={this.props.handleChange} placeholder="Enter wanted canonical" />

          <label>Do you want to block indexing?</label>

          <div id="toogler_noindex">

            <input type="checkbox" id={`id-noindex`} name='noindex' className="checkbox" checked={this.props.noindex} onChange={this.props.handleCheck} />

            <label style={{ justifyContent: lr_noindex }} htmlFor={`id-noindex`} className="switch">
              <span>{this.props.noindex ? `ON` : `OFF`}</span>
            </label>
          </div>



          <label>Do you want set the article's links to be no follow?</label>

          <div id="toogler_nofollow">

            <input type="checkbox" id={`id-nofollow`} name='nofollow' className="checkbox" checked={this.props.nofollow} onChange={this.props.handleCheck} />

            <label style={{ justifyContent: lr_nofollow }} htmlFor={`id-nofollow`} className="switch">
              <span>{this.props.nofollow ? `ON` : `OFF`}</span>
            </label>
          </div>


        </form>

        <div id='nav'>
          <button onClick={(e) => {
            const isValid = this.validateInputs(e)
            console.log({isValid})
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

export default _1_SetArticleHeadTagData