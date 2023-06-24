import './styles/_2_SetArticleBodyHeader.css'
import CATEGORY from '../../../full-stack-libs/Types/ArticleCategories';
import UploadImage from './UploadImage'


class _2_SetArticleBodyHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: []
    }

  }

  componentDidMount(){
    let options = []

    const categoryKeys = Object.keys(CATEGORY);

    categoryKeys.forEach((CATEGORY_key, index) => {
      const CATEGORY_val = CATEGORY[CATEGORY_key];
      options.push(
        <option value={CATEGORY_val} key={index}>{CATEGORY_val}</option>
      );
    });

    this.setState({
      options: options
    })
  }

  render() {
    return (
      <React.Fragment>
        <h3>Set Article's body header tag data:</h3>

        <form id="create-article-form-id" className="form">
          <label>Set wanted Article keywords</label>

          <input type="text" name="keywords" onChange={this.props.handleChange} placeholder="Enter wanted Keywords" value={this.props.keywords.join(',  ')} required/>

          <div className="input-with-tags">
            {this.props.keywords.map((keyword, index) => {
              if (!keyword) {return}
              return <React.Fragment key={index}>
                <span className="tag">
                  {keyword}
                </span>
              </React.Fragment>
            })}
          </div>

          <label>Set Article's category (database), genre (schema), and about (schema)</label>
          <select value={this.props.category} onChange={this.props.handleChange} name="category" required >
            <option value="">no selection</option>  
            {this.state.options}
          </select> 

          <label>Upload A Banner Image</label>
          <UploadImage
            image_name={this.props.banner_image_name}
            image_file={this.props.banner_image_file}
            // setStateBannerImage={this.props.setStateBannerImage} 
            onClickCallback={this.inputBufferOnChange}
          />

          <label>Set Banner Image Alternate text</label>
          <input type="text" name="banner_img_alt" value={this.props.banner_img_alt} onChange={this.props.handleChange} placeholder="Enter coresponding banner image alt text content" required/>

          <label>Set Article's H1</label>
          <input type="text" name="h1" value={this.props.h1} onChange={this.props.handleChange} placeholder="Enter article's H1" required/>


        </form>

        <div id='nav'>
          <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
          <button onClick={(e) => this.props.previousStep()}>Previous </button>

          <button onClick={(e) => {
            const isValid = this.props.validateInputs(e)
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

  inputBufferOnChange = (e = null) => {
    if (!e) return
    // Only triggers on file change (therefor a file is always present), so this guard is not necessary
    if (!e.currentTarget.files[0]) return

    // console.log("onChange!!!", e, '\n', e.target)
    console.log(e.currentTarget.files[0].name)


    const banner_image_name = e.currentTarget.files[0].name
    const banner_image_file = e.currentTarget.files[0]
    this.props.setStateBannerImage(banner_image_name, banner_image_file)
  }
}

export default _2_SetArticleBodyHeader