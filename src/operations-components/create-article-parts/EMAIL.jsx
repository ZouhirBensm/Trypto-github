import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'
import EMAIL_MARKETING_TYPES from '../../../full-stack-libs/Types/EmailMarketingTypes'

class EMAIL extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
    }
  }


  componentDidMount() {
    let options = []

    const categoryKeys = Object.keys(EMAIL_MARKETING_TYPES);

    categoryKeys.forEach((EMAIL_MARKETING_TYPE_key, index) => {
      const EMAIL_MARKETING_TYPE_val = EMAIL_MARKETING_TYPES[EMAIL_MARKETING_TYPE_key];

      options.push(
        <option value={EMAIL_MARKETING_TYPE_val} key={index}>{EMAIL_MARKETING_TYPE_val}</option>
      );
    });


    this.setState({
      options: options
    })


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
            this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.EMAIL, this.props._step)
          }} required />

          <label>Email collector subtitle: </label>
          <input name="EMAIL_subtitle" value={defaultValues?.EMAIL_subtitle || ""} type="text" placeholder="Enter wanted subtitle for the email collector" onChange={(e) => {
            e.persist()
            this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.EMAIL, this.props._step)
          }} required />


          <label>Set the email marketing collector type</label>
          <select name="BUTTON_text" value={defaultValues?.BUTTON_text} onChange={(e) => {
            e.persist()

            this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.EMAIL, this.props._step)

            // TODO !!! not sure most optimal way syntheticEvent, might need a react way to create this event
            const syntheticEvent = {
              target: {
                name: 'RESOURCE_path',
                value: ''
              }
            };
            this.props.innerHandleChange(syntheticEvent, SECTION_TYPES.EMAIL, this.props._step);
          }} required>
            <option value="">no selection</option>
            {this.state.options}
          </select>

          {
            defaultValues?.BUTTON_text === EMAIL_MARKETING_TYPES.DOWNLOAD ? 
            <React.Fragment>
              <label>Resource path: </label>
              <span>Format as of July 2023: /resources/pdfs/file.pdf</span>
              <input name="RESOURCE_path" value={defaultValues?.RESOURCE_path || ""} type="text" placeholder="In a download setting add the resource path" onChange={(e) => {
                e.persist()
                this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.EMAIL, this.props._step)
              }} required/>
            </React.Fragment>
            :
            null
          }

        </div>

      </React.Fragment>
    )
  }
}

export default EMAIL