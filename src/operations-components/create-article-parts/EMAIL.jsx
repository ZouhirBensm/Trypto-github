import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'

class EMAIL extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {

    let objIndex = this.props.nested_data?.findIndex((obj => {
      return (obj.type == SECTION_TYPES.EMAIL && obj.id == this.props._step)
    }));

    let defaultValues

    if (objIndex != -1) {
      defaultValues = this.props.nested_data[objIndex]
    }


    return (
      <React.Fragment>
        <h3>EMAIL collection component:</h3>

        <div id="create-article-form-id" className="form">


          <label>Email collector title: </label>
          <input name="EMAIL_title" value={defaultValues?.EMAIL_title || ""} type="text" placeholder="Enter wanted title for the email collector" onChange={(e) => {
            e.persist()
            this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
          }} required />

          <label>Email collector subtitle: </label>
          <input name="EMAIL_subtitle" value={defaultValues?.EMAIL_subtitle || ""} type="text" placeholder="Enter wanted subtitle for the email collector" onChange={(e) => {
            e.persist()
            this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
          }} required />

        </div>

      </React.Fragment>
    )
  }
}

export default EMAIL