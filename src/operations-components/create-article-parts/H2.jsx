
class H2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        <h3>H2 Component Setter:</h3>
        
        <form id="create-article-form-id" className="form">

        <label>H2's inner HTML: </label>
        {/* name="banner_img_alt" value={this.props.banner_img_alt} onChange={this.props.handleChange} placeholder="Enter coresponding banner image alt text content" required */}
        <input type="text"/>

        </form>

      </React.Fragment>
    )
  }
}

export default H2