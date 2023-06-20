import UploadBannerImage from './UploadBannerImage'
class Part4 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  async clickCreateArticle() {
    // console.log("Creating an article...")

    const formData = new FormData();

    formData.append("image", this.props.banner_image_file)

    let nonImageData = {
      html_title: this.props.html_title,
      meta_title: this.props.meta_title,
      meta_description: this.props.meta_description,
      canonical: this.props.canonical,
      noindex: this.props.noindex,
      nofollow: this.props.nofollow,
      keywords: this.props.keywords,
      category: this.props.category,
      banner_img_alt: this.props.banner_img_alt,
      h1: this.props.h1,
      banner_image_name: this.props.banner_image_name,
      content: this.props.content,
      abstract_name_type: this.props.abstract_name_type,
      abstract_points: this.props.abstract_points
    }

    for (const name in nonImageData) {
      if (Object.hasOwnProperty.call(nonImageData, name)) {
        let value = nonImageData[name];
        console.log(value)
        if(typeof value === 'undefined' || value === '') continue

        if (Array.isArray(value)) value = JSON.stringify(value)
        formData.append(name, value);
      }
    }

    let response
    response = await fetch(`/operations/create-article`, {
      method: 'POST',
      body: formData
    })

    console.log(response)
    console.log(response.status)


  }


  render() {
    return (
      <React.Fragment>
        <div>Part4</div>

        <label>Upload A Banner Image</label>
        <UploadBannerImage
          banner_image_name={this.props.banner_image_name}
          banner_image_file={this.props.banner_image_file}
          setStateBannerImage={this.props.setStateBannerImage}
        />

        <br/><br/>



        <button type='submit' onClick={(e) => {
          e.preventDefault()
          this.clickCreateArticle()
        }}>Create</button>

        <div id='nav'>
          <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
          <button onClick={(e) => this.props.previousStep()}>Previous </button>
          <button onClick={(e) => this.props.nextStep()}>Proceed</button>
          <img src="/img/SVG/operations/create-article/proceed.svg" alt="" />
        </div>



      </React.Fragment>
    )
  }
}

export default Part4