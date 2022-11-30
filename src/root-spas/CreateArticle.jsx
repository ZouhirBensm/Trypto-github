import '../style/reactDivMobile.css'
import CATEGORY from '../../full-stack-libs/Types/ArticleCategories';
import THIRD_PARTY_CATEGORY from '../../full-stack-libs/Types/ArticleThirdPartyCategories';


class CreateArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.clickCreateArticle = this.clickCreateArticle.bind(this)
  }

  componentDidMount() {
    this.buildCategorySelect()
  }

  buildCategorySelect() {
    let selectCategory = document.getElementById("category-select")
    let THIRD_PARTY_CATEGORY_value_array = Object.values(THIRD_PARTY_CATEGORY)
    for (const key in CATEGORY) {
      if (Object.hasOwnProperty.call(CATEGORY, key)) {
        const category_element = CATEGORY[key];
        if (THIRD_PARTY_CATEGORY_value_array.includes(category_element)) continue
        let newOption = document.createElement("option")
        newOption.setAttribute("value", category_element);
        newOption.innerHTML = category_element
        selectCategory.appendChild(newOption)
      }
    }
    selectCategory.value = CATEGORY.BITCOIN
  }

  async clickCreateArticle(e) {
    e.preventDefault()
    console.log("Creating an article...")

    let input = document.getElementById('image-select')
    let selectedFile = input.files[0]

    const formData = new FormData();

    formData.append("image", selectedFile)

    let nonImageData = {
      title: document.getElementById("form_id").elements["title"].value,
      content: document.getElementById("form_id").elements["content"].value,
      category: document.getElementById("form_id").elements["category"].value
    }

    for (const name in nonImageData) {
      if (Object.hasOwnProperty.call(nonImageData, name)) {
        const value = nonImageData[name];
        formData.append(name, value);
      }
    }

    console.log(formData)

    let response
    response = await fetch(`/operations/create-article`, {
      method: 'POST',
      body: formData
    })

    // let json
    // json = await response.json()

    console.log(response)
    // console.log(json)

    // switch (response.status) {
    //   case 200:
    //     console.log("pop up that you have successfully created an article")
    //     break;
    //   case 500:
    //     console.log("pop up that you have a server internal error")
    //     break;
    //   default:
    //     console.log("pop up that you have a status that is not 200 nor 500")
    //     break;
    // }

  }

  render() {


    return (
      <React.Fragment>

        <div className="create-article-container">
          <form className="form" id="form_id">
            <h3>Creating an article...</h3>

            <label htmlFor="crypto-select">Select Category</label>
            <select name="category" id="category-select" required>
            </select> <br/>

            <label htmlFor="title-id">Title</label>
            <input type="text" name='title' id='title-id' required /> <br/>

            <label htmlFor="content-id">Content</label>
            <textarea name="content" id="content-id" cols="30" rows="5" required></textarea> <br/>

            <input id="image-select" type="file" name="image" /> <br/>

            <button type='submit' onClick={async (e) => {
              e.preventDefault()
              // let ret_validation = this.profilePicSaveValidation()
              // if (ret_validation) {
              if (true) {
                let ret_clickCreateArticle = await this.clickCreateArticle(e)
                return
              } else {
                // const error_msg = `No file was loaded. Please load a file before saving.`
                // this.props.setpopups(error_msg)
                return
              }
            }}>Create Article</button> <br/>
          </form>
        </div>

        <a href="/operations/articles-dashboard">Back</a>

      </React.Fragment>
    )
  }
}

const element = <CreateArticle />;

ReactDOM.render(element, document.getElementById('react-div'));

export default CreateArticle