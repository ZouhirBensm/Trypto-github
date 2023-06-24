import './styles/A.css'

class A extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {


    let objIndex = this.props.nested_data?.findIndex((obj => { return (obj.type == this.constructor.name && obj.id == this.props._step) }));

    // let object = this.props.nested_data?.find((object)=>{return object.type == this.constructor.name})
    let defaultValues

    if (objIndex != -1) {
      defaultValues = this.props.nested_data[objIndex]
    }


    const lr_newtab = defaultValues?.newtab ? "flex-start" : "flex-end"


    return (
      <React.Fragment>
        <h3>Block level Link A:</h3>

        <form id="create-article-form-id" className="form">


          <label>A's href:</label>
          <input name="A_href" value={defaultValues?.A_href || ""} type="text" placeholder="A href"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }}
            required />

          <label>A's inner text:</label>
          <input name="A_innerText" value={defaultValues?.A_innerText || ""} type="text" placeholder="A inner text"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }}
            required />

          <label>A's title:</label>
          <input name="A_title" value={defaultValues?.A_title || ""} type="text" placeholder="A title"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }} />

          <label>New tab open</label>
          <div id="toogler_newtab">

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

          </div>

        </form>

      </React.Fragment>
    )
  }
}

export default A