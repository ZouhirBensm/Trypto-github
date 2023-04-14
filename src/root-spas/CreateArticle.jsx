import '../style/reactDivMobile.css'
import {validateInputs} from '../../full-stack-libs/validations'
import CATEGORY from '../../full-stack-libs/Types/ArticleCategories';
import THIRD_PARTY_CATEGORY from '../../full-stack-libs/Types/ArticleThirdPartyCategories';


class CreateArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: null
    }
    this.clickCreateArticle = this.clickCreateArticle.bind(this)
    this.setpopups = this.setpopups.bind(this)
    this.popup
  }

  
  componentDidMount() {
    this.buildCategorySelect()

    let popup = document.getElementById('popup')
    popup.style.display = "block";
    let form = document.getElementById("form_id")
    form.append(popup)
  }


  articlePostValidation(){
    let error_message = undefined

    error_message = validateInputs({
      title: document.getElementById("form_id").elements["title"].value,
      // content: document.getElementById("form_id").elements["content"].value,
      category: document.getElementById("form_id").elements["category"].value
    })

    if(!!error_message){
      return error_message
    }

    let input = document.getElementById('image-select')
    let selectedFile = input.files[0]
    const isThereAFile = !!selectedFile
    // console.log(isThereAFile)

    if(!isThereAFile) {
      error_message = `Please upload a associated image before making a save request to the server!`
      return error_message
    }
    return
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

    let response
    response = await fetch(`/operations/create-article`, {
      method: 'POST',
      body: formData
    })

    let json
    json = await response.json()

    console.log(response)
    console.log(json)

    switch (response.status) {
      case 200:
        return json.server?.message
      case 500:
        return json.error?.message.message
      default:
        return json.error?.message.message
    }

  }

  setpopups(_error_msg){
    console.log("setting the popup..", _error_msg)

    this.setState({
      popup: _error_msg
    })
  }


  render() {
    let popup = document.getElementById('popup')
    popup.innerHTML = this.state.popup


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
              let ret_validation = this.articlePostValidation()

              if (ret_validation) {
                const error_msg = ret_validation
                this.setpopups(error_msg)
              } else {
                let ret_clickCreateArticle = await this.clickCreateArticle(e)
                this.setpopups(ret_clickCreateArticle)
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