import UploadImage from './UploadImage'
import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'

class IMG extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  
  img_onChange = (e) => {
    e.persist()
    let type = this.constructor.name

    if(this.props.encapsulated_by_a){
      type = SECTION_TYPES.A
    }
    
    this.props.innerHandleChange(e.nativeEvent, type, this.props._step)
  }

  render() {


    let type = this.constructor.name

    if (this.props.encapsulated_by_a){
      type = SECTION_TYPES.A
    }

    let objIndex = this.props.nested_data?.findIndex((obj => { return (obj.type == type && obj.id == this.props._step) }));

    let defaultValues

    if (objIndex != -1) {
      defaultValues = this.props.nested_data[objIndex]
    }


    return (
      <React.Fragment>



        <UploadImage
          image_name={defaultValues?.image?.image_name}
          image_file={defaultValues?.image?.image_file}
          onClickCallback={this.inputBufferOnChange}
          required={true}
          inputID="input-img-id-or-validation"
        />

        <label>Image's width:</label>
        <input name="img_width" value={defaultValues?.img_width || ""} type="number" placeholder="in px"
          onChange={this.img_onChange}
          required />

        <label>Image's height:</label>
        <input name="img_height" value={defaultValues?.img_height || ""} type="number" placeholder="in px"
        onChange={this.img_onChange}
          required />


        <label>Image's src:</label>
        <input id="image-src" name="img_src" value={defaultValues?.img_src || ""} type="text" placeholder="image's source link"
        onChange={this.img_onChange}
          required />

        <label>Image's alt text:</label>
        <input name="img_alt" value={defaultValues?.img_alt || ""} type="text" placeholder="image's alternative text"
        onChange={this.img_onChange}
          required />


        <label>Image's schema description:</label>
        <input name="img_description" value={defaultValues?.img_description || ""} type="text" placeholder="image's schema description"
        onChange={this.img_onChange}
          required />





        

      </React.Fragment>
    )
  }

  inputBufferOnChange = (e) => {
    if (!e) return
    // Only triggers on file change (therefor a file is always present), so this guard is not necessary
    if (!e.currentTarget.files[0]) return

    let type = this.constructor.name

    if(this.props.encapsulated_by_a){
      type = SECTION_TYPES.A
    }

    // console.log("onChange!!!", e, '\n', e.target)
    // console.log("--->>", e.currentTarget.files[0].name, this.constructor.name, type, this.props._step)




    this.props.innerHandleChange(e, type, this.props._step)
  }
}

export default IMG