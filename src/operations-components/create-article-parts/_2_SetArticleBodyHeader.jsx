import './styles/_2_SetArticleBodyHeader.css'
import CATEGORY from '../../../full-stack-libs/Types/ArticleCategories';
import UploadBannerImage from './UploadBannerImage'


class _2_SetArticleBodyHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  componentDidMount() {
    this.buildCategorySelect()
  }

  buildCategorySelect() {
    let select1 = document.getElementsByTagName("select")[0]

    for (const key in CATEGORY) {
      if (Object.hasOwnProperty.call(CATEGORY, key)) {
        let category = CATEGORY[key];
        let newOption = document.createElement("option")

        // category = category.toLowerCase()
        // .replace(/_/g, ' ');
        newOption.setAttribute("value", category);
        newOption.innerHTML = category
        select1.appendChild(newOption)
      }
    }
    select1.value = ''
    // .toLowerCase().replace(/_/g, ' ');
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
          <select defaultValue="" onChange={this.props.handleChange} name="category" required >
            <option value="">no selection</option>  
          </select> 

          <label>Upload A Banner Image</label>
          <UploadBannerImage
            banner_image_name={this.props.banner_image_name}
            banner_image_file={this.props.banner_image_file}
            setStateBannerImage={this.props.setStateBannerImage} 
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
}

export default _2_SetArticleBodyHeader