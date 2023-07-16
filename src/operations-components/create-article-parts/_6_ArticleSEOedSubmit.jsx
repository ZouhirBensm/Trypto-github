import './styles/_6_ArticleSEOedSubmit.css'
import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'

class _6_ArticleSEOedSubmit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined
    }
  }

  async clickCreateArticle() {
    console.log("Creating an article...")

    let nested_data_copy = structuredClone(this.props.nested_data);

    const formData = new FormData();




    // Pull out images from this.props.nested_data (IMG) in array
    // Pull out images from this.props.nested_data (A) in array
    let files_from_nested_data = []
    for (let i = 0; i < this.props.nested_data.length; i++) {
      const block = this.props.nested_data[i];
      if (block.type === SECTION_TYPES.IMG ||
        (block.type === SECTION_TYPES.A && !!block.image_mode_on)) {

        if (!block.image) continue

        const image_in_id = block.id

        // SET 1: Upload object information image data
        // files_from_nested_data.push({
        //   id: image_in_id,
        //   ...block.image
        // })

        // SET 2: Upload image files only
        files_from_nested_data.push(block.image.image_file)

        delete nested_data_copy[image_in_id - 1].image.image_file
      }
    }





    // SET 1: Upload object information image data
    // id 0 is the banner image
    // Mount banner image as first:

    // const image_files_all = [{
    //   id: 0,
    //   image_name: this.props.banner_image_name,
    //   image_file: this.props.banner_image_file,
    // }, ...files_from_nested_data]

    // SET 2: Upload image files only

    const image_files_all = [this.props.banner_image_file, ...files_from_nested_data]


    console.log("\n____________________________\n\nImages: \n")
    console.log("\nImages files: \n", image_files_all)

    console.log('\n\n\n')


    // Appended all images, first one being the banner image
    for (let i = 0; i < image_files_all.length; i++) {
      const file = image_files_all[i];
      formData.append('files', file)
    }



    console.log("\n____________________________\n\nNested Data with deleted image files: \n")
    console.log("\n", nested_data_copy)

    console.log('\n\n\n')


    

    

    let headHeaderAbstractStructureData = {
      // _1_SetArticleHeadTagData
      html_title: this.props.html_title,
      meta_title: this.props.meta_title,
      meta_description: this.props.meta_description,
      canonical: this.props.canonical,
      noindex: this.props.noindex,
      nofollow: this.props.nofollow,

      // _2_SetArticleBodyHeader
      keywords: this.props.keywords,
      category: this.props.category,
      // banner_img_alt: this.props.banner_img_alt,
      // FILE: banner_image_file: this.props.banner_image_file
      // banner_image_name: this.props.banner_image_name
      h1: this.props.h1,

      // _3_Abstract
      abstract_name_type: this.props.abstract_name_type,
      abstract_points: this.props.abstract_points,

      // _4_ContentStructure
      content_structure: this.props.content_structure,

    }

    for (const name in headHeaderAbstractStructureData) {
      if (Object.hasOwnProperty.call(headHeaderAbstractStructureData, name)) {
        let value = headHeaderAbstractStructureData[name];
        // console.log(value)
        if (typeof value === 'undefined' || value === '' || value === false) continue

        if (Array.isArray(value)) value = JSON.stringify(value)
        formData.append(name, value);
      }
    }


    let headerBannerImageData = {
      // _2_SetArticleBodyHeader
      banner_img_alt: this.props.banner_img_alt,
      banner_image_name: this.props.banner_image_name
    }


    for (const name in headerBannerImageData) {
      if (Object.hasOwnProperty.call(headerBannerImageData, name)) {
        let value = headerBannerImageData[name];
        // console.log(value)
        if (typeof value === 'undefined' || value === '') continue

        if (Array.isArray(value)) value = JSON.stringify(value)
        formData.append(name, value);
      }
    }



    const STRING_nested_data_copy = JSON.stringify(nested_data_copy)

    formData.append('nested_data_copy', STRING_nested_data_copy);
    formData.append("create_true_edit_false", this.props.create_true_edit_false);

    // TODO !!!! Need to block on unchanged inputs, do front, back end, not sure yet...


    const HTTP_METHOD = this.props.create_true_edit_false ? 'POST' : 'PUT'
    const URL = this.props.create_true_edit_false ? `/operations/create-article`: `/operations/edit-article?articleID_to_preload_4_edit=${this.props.articleID_to_preload_4_edit}`

    let response
    response = await fetch(URL, {
      method: HTTP_METHOD,
      body: formData
    })

    console.log(response)
    console.log(response.status)

    if (response.ok) {
      const success = `Article ${this.props.create_true_edit_false? 'created': 'edited'}!`
      this.setState({
        popup: success
      }, () => {
        setTimeout(() => {
          this.setState({
            popup: undefined
          })
        }, 3000)
      })
      return
    }

    this.setState({
      popup: undefined
    })

  }


  render() {

    const word = this.props.create_true_edit_false? 'Create': 'Edit'

    return (
      <React.Fragment>
        <h3>{word} your article!</h3>

        {/* <label>Upload A Banner Image</label>
        <UploadImage
          image_name={this.props.banner_image_name}
          image_file={this.props.banner_image_file}
          onClickCallback={this.inputBufferOnChange}
        />

        <br/><br/> */}



        <button type='submit' onClick={(e) => {
          e.preventDefault()
          this.clickCreateArticle()
        }}>
          {word}
        </button>

        {this.state.popup ?
          <span id='popup'>{this.state.popup}</span> :
          null
        }

        <div id='nav'>
          <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
          <button onClick={(e) => this.props.previousStep(e)}>Previous</button>

          {/* <button onClick={(e) => this.props.nextStep()}>Proceed</button>
          <img src="/img/SVG/operations/create-article/proceed.svg" alt="" /> */}

        </div>



      </React.Fragment>
    )
  }

  // inputBufferOnChange = (e = null) => {
  //   if (!e) return
  //   // Only triggers on file change (therefor a file is always present), so this guard is not necessary
  //   if (!e.currentTarget.files[0]) return

  //   // console.log("onChange!!!", e, '\n', e.target)
  //   console.log(e.currentTarget.files[0].name)


  //   const banner_image_name = e.currentTarget.files[0].name
  //   const banner_image_file = e.currentTarget.files[0]
  //   this.props.setStateBannerImage(banner_image_name, banner_image_file)
  // }
}

export default _6_ArticleSEOedSubmit