import UploadImage from './UploadImage'

class IMG extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {


    let objIndex = this.props.nested_data?.findIndex((obj => { return (obj.type == this.constructor.name && obj.id == this.props._step) }));

    let defaultValues

    if (objIndex != -1) {
      defaultValues = this.props.nested_data[objIndex]
    }




    // const lr_newtab = defaultValues?.newtab ? "flex-start" : "flex-end"


    return (
      <React.Fragment>
        <h3>Image:</h3>

        <form id="create-article-form-id" className="form">

          <UploadImage
            image_name={defaultValues?.image?.image_name}
            image_file={defaultValues?.image?.image_file}
            // setStateBannerImage={this.props.setStateBannerImage} 
            onClickCallback={this.inputBufferOnChange}
          />

          <label>Image's width:</label>
          <input name="img_width" value={defaultValues?.img_width || ""} type="number" placeholder="in px"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }}
            required />

          <label>Image's height:</label>
          <input name="img_height" value={defaultValues?.img_height || ""} type="number" placeholder="in px"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }}
            required />


          <label>Image's src:</label>
          <input name="img_src" value={defaultValues?.img_src || ""} type="text" placeholder="image's source link"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }}
            required />

          <label>Image's alt text:</label>
          <input name="img_alt" value={defaultValues?.img_alt || ""} type="text" placeholder="image's alternative text"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }}
            required />


          <label>Image's schema description:</label>
          <input name="img_description" value={defaultValues?.img_description || ""} type="text" placeholder="image's schema description"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }}
            required />







          {/* <label>New tab open</label>
          <div id="toogler-newtab">

            <input type="checkbox" id='id-newtab' name='newtab' className="checkbox" checked={defaultValues?.newtab} onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }} />


            <label style={{ justifyContent: lr_newtab }} htmlFor='id-newtab' className="switch">
              <span>{defaultValues?.newtab ? `ON` : `OFF`}</span>
            </label>
          </div>

          <label>Relationship</label>

          <div id="checkboxes_rel">
            <label htmlFor='id-noopener'>noopener</label>

            <input type="checkbox" id='id-noopener' name='noopener' checked={defaultValues?.noopener} onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }} />

            <label htmlFor='id-nofollow'>nofollow</label>

            <input type="checkbox" id='id-nofollow' name='nofollow' checked={defaultValues?.nofollow} onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }} />

            <label htmlFor='id-ugc'>ugc</label>

            <input type="checkbox" id='id-ugc' name='ugc' checked={defaultValues?.ugc} onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }} />

          </div> */}


        </form>

      </React.Fragment>
    )
  }

  inputBufferOnChange = (e) => {
    if (!e) return
    // Only triggers on file change (therefor a file is always present), so this guard is not necessary
    if (!e.currentTarget.files[0]) return

    // console.log("onChange!!!", e, '\n', e.target)
    console.log("--->>", e.currentTarget.files[0].name, this.constructor.name, this.props._step)




    this.props.innerHandleChange(e, this.constructor.name, this.props._step)
  }
}

export default IMG