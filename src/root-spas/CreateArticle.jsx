import '../style/reactDivMobile.css'
import {validateInputs} from '../../full-stack-libs/validations'
import CATEGORY from '../../full-stack-libs/Types/ArticleCategories';
import THIRD_PARTY_CATEGORY from '../../full-stack-libs/Types/ArticleThirdPartyCategories';

import './styles/CreateArticle.css'


class CreateArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: null,
      image_name_about_to_save: undefined,
      file_about_to_save: undefined,
    }
    this.clickCreateArticle = this.clickCreateArticle.bind(this)
    this.setpopups = this.setpopups.bind(this)
    this.popup
  }

  
  componentDidMount() {
    this.buildCategorySelect()

    const imageSelect = document.getElementById('image-select')
    let popup = document.getElementById('popup')

    popup.style.display = "block";
    imageSelect.parentNode.insertBefore(popup, imageSelect.nextSibling);
    

    // let form = document.getElementById("form_id")
    // form.append(popup)
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

    // let input = document.getElementById('image-select')
    // let selectedFile = input.files[0]
    // const isThereAFile = !!selectedFile
    // console.log(isThereAFile)


    // if(!isThereAFile) {
    //   error_message = `Please upload a associated image before making a save request to the server!`
    //   return error_message
    // }
    // return

    if(!this.state.file_about_to_save) {
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
    // console.log("Creating an article...")

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


  inputBufferOnChange(e = null) {
    if (!e) return
    // Only triggers on file change (therefor a file is always present), so this guard is not necessary
    if (!e.currentTarget.files[0]) return

    // console.log("onChange!!!", e, '\n', e.target)
    console.log(e.currentTarget.files[0].name)

    this.setState({
      image_name_about_to_save: e.currentTarget.files[0].name,
      file_about_to_save: e.currentTarget.files[0],
      popup: null
    })
  }

  componentWillUnmount() {
    let input = document.getElementById('image-select')
    let dt = new DataTransfer()
    input.files = dt.files
  }


  render() {
    let popup = document.getElementById('popup')
    popup.innerHTML = this.state.popup

    const displayNoFileChosen = 'No file Chosen'


    return (
      <React.Fragment>

        <div id="create-article-container">
          <form className="form" id="form_id">
            <h1>Create an article</h1>

            <label htmlFor="crypto-select">Select Category</label>
            <select name="category" id="category-select" required>
            </select> 

            <label htmlFor="title-id">Title</label>
            <input type="text" name='title' id='title-id' required placeholder='Your title'/> 

            <label htmlFor="content-id">Content</label>
            <textarea name="content" id="content-id" cols="30" rows="20" required></textarea> 

            <label id='upload-button' htmlFor="image-select">Upload</label>
            <div>
              {this.state.image_name_about_to_save ?
                this.state.image_name_about_to_save
                :
                displayNoFileChosen
              }
            </div>

            <input id="image-select" type="file" name="image" onChange={(e) => { this.inputBufferOnChange(e) }}/>

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
            }}>Create</button>

            <a href="/operations/articles-dashboard">
              <img src="/img/SVG/operations/global/back.svg" alt="" />
            </a>

          </form>
        </div>


      </React.Fragment>
    )
  }
}

const element = <CreateArticle />;

ReactDOM.render(element, document.getElementById('react-div'));

export default CreateArticle