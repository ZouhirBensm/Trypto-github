import './styles/A.css'
import IMG from './IMG'

class A extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image_or_not: false
    }
  }


  IMGorTEXT = (e) => {
    this.setState({
      image_or_not: !this.state.image_or_not
    })
  }


  render() {
    let objIndex = this.props.nested_data?.findIndex((obj => { return (obj.type == this.constructor.name && obj.id == this.props._step) }));

    // let object = this.props.nested_data?.find((object)=>{return object.type == this.constructor.name})
    let defaultValues

    if (objIndex != -1) {
      defaultValues = this.props.nested_data[objIndex]
    }


    const lr_newtab = defaultValues?.newtab ? "flex-start" : "flex-end"
    const lr_image_or_text = this.state.image_or_not ? "flex-start" : "flex-end"


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


          <label>A's title:</label>
          <input name="A_title" value={defaultValues?.A_title || ""} type="text" placeholder="A title"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
            }} />

          <label>New tab open</label>


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

          </div>


          <label>Set image or text</label>

          <div id="toogler-image-or-text">

            <input type="checkbox" id='id-image_or_text' name='image_or_text' className="checkbox" checked={this.state.image_or_not} 
            onChange={(e) => {
              this.IMGorTEXT(e)
              this.props.innerHandleChangeToogleDeleteFields(e, this.constructor.name, this.props._step, this.state.image_or_not, ['imgfield'], ['A_innerText'])
            }} 
            />
            <label style={{ justifyContent: lr_image_or_text }} htmlFor='id-image_or_text' className="switch">
              <span>{this.state.image_or_not ? `IMG` : `TEXT`}</span>
            </label>
          </div>


          {this.state.image_or_not ?
            <React.Fragment>
            <label>Set integrated image</label>            
            {/* <input name="imgfield" value={defaultValues?.imgfield || ""} type="text" placeholder="img field test"
              onChange={(e) => {
                e.persist()
                this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
              }}
              required /> */}
              <IMG
                _step={this.props._step}
                _last_step={this.props._last_step}
                _previousStep={this.props._previousStep}
                _nextStep={this.props._nextStep}

                nested_data={this.props.nested_data}
                innerHandleChange={this.props.innerHandleChange}
              />
            </React.Fragment>
            : 
            <React.Fragment>
              <label>A's inner text:</label>
              <input name="A_innerText" value={defaultValues?.A_innerText || ""} type="text" placeholder="A inner text"
                onChange={(e) => {
                  e.persist()
                  this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
                }}
                required />
            </React.Fragment>
          }


        </form>

      </React.Fragment >
    )
  }
}

export default A