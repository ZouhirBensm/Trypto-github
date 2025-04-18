import './styles/_1_SetArticleHeadTagData.css'


class _1_SetArticleHeadTagData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }




  render() {

    const lr_noindex = this.props.noindex ? "flex-start" : "flex-end"
    const lr_nofollow = this.props.nofollow ? "flex-start" : "flex-end"


    return (
      <React.Fragment>
        <h3>Set Article's head tag data:</h3>

        <div id="create-article-form-id" className="form">

          <label>Set Article's sitemap changefreq</label>
          <select value={this.props.changefreq} onChange={this.props.handleChange} name="changefreq" required >
            <option value="">no selection</option>
            <option value="always">always</option>
            <option value="hourly">hourly</option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="yearly">yearly</option>
            <option value="never">never</option>
          </select>

          <label>HTML Title, title tag:</label>

          <input type="text" name="html_title" value={this.props.html_title} onChange={this.props.handleChange} placeholder="Enter wanted HTML Title" required />

          <label>Article's meta title:</label>

          <input type="text" name="meta_title" value={this.props.meta_title} onChange={this.props.handleChange} placeholder="Enter wanted meta title" required />

          <label>Article's meta description:</label>

          <input type="text" name="meta_description" value={this.props.meta_description} onChange={this.props.handleChange} placeholder="Enter wanted meta description" required />

          <label>Custom article canonical:</label>

          {/* if stating with this.props.canonical is undefined use value={this.props.canonical || ""} */}
          <input type="text" name="canonical" value={this.props.canonical || ""} onChange={this.props.handleChange} placeholder="Enter wanted canonical" />

          <label>Do you want to block indexing?</label>

          <div id="toogler_noindex">

            <input type="checkbox" id='id-noindex' name='noindex' className="checkbox" checked={this.props.noindex} onChange={this.props.handleCheck} />

            <label style={{ justifyContent: lr_noindex }} htmlFor='id-noindex' className="switch">
              <span>{this.props.noindex ? `ON` : `OFF`}</span>
            </label>
          </div>



          <label>Do you want set the article's links to be no follow?</label>

          <div id="toogler_nofollow">

            <input type="checkbox" id='id-nofollow' name='nofollow' className="checkbox" checked={this.props.nofollow} onChange={this.props.handleCheck} />

            <label style={{ justifyContent: lr_nofollow }} htmlFor='id-nofollow' className="switch">
              <span>{this.props.nofollow ? `ON` : `OFF`}</span>
            </label>
          </div>


        </div>

        <div id='nav'>
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

export default _1_SetArticleHeadTagData