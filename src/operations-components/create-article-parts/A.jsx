import './styles/A.css'
import IMG from './IMG'
import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'

class A extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image_mode_on: false,
    }
    this.innerText = React.createRef();
    this.imageContainer = React.createRef();
  }
  



  // shouldComponentUpdate(prevProps){
  //   if(prevProps._step !== this.props._step) return true
  //   return false
  // }



  IMGorTEXT = (e) => {

    this.setState(prevState => {

      return { 
        image_mode_on: !prevState.image_mode_on,
      };
    });
  }


  render() {

    let objIndex = this.props.nested_data?.findIndex((obj => {
      return (obj.type == SECTION_TYPES.A && obj.id == this.props._step) 
    }));

    let defaultValues

    if (objIndex != -1) {
      defaultValues = this.props.nested_data[objIndex]
    }

    // console.log(defaultValues)
    


    const lr_newtab = defaultValues?.newtab ? "flex-start" : "flex-end"
    const lr_image_or_text = defaultValues?.image_mode_on || this.state.image_mode_on ? "flex-start" : "flex-end"


    return (
      <React.Fragment>
        <h3>Block level Link A:</h3>

        <div id="create-article-form-id" className="form">


          <label>A's href:</label>
          <input name="A_href" value={defaultValues?.A_href || ""} type="text" placeholder="A href"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.A, this.props._step)
            }}
            required />


          <label>A's title:</label>
          <input name="A_title" value={defaultValues?.A_title || ""} type="text" placeholder="A title"
            onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.A, this.props._step)
            }} />




          <label>New tab open</label>

          <div id="toogler-newtab" className='toogler'>

            <input type="checkbox" id='id-newtab' name='newtab' className="checkbox" checked={!!defaultValues?.newtab} onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.A, this.props._step)
            }} />


            <label style={{ justifyContent: lr_newtab }} htmlFor='id-newtab' className="switch">
              <span>{defaultValues?.newtab ? `ON` : `OFF`}</span>
            </label>
          </div>

          <label>Relationship</label>

          <div id="checkboxes_rel">
            <label htmlFor='id-noopener'>noopener</label>

            <input type="checkbox" id='id-noopener' name='noopener' checked={!!defaultValues?.noopener} onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.A, this.props._step)
            }} />

            <label htmlFor='id-nofollow'>nofollow</label>

            <input type="checkbox" id='id-nofollow' name='nofollow' checked={!!defaultValues?.nofollow} onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.A, this.props._step)
            }} />

            <label htmlFor='id-ugc'>ugc</label>

            <input type="checkbox" id='id-ugc' name='ugc' checked={!!defaultValues?.ugc} onChange={(e) => {
              e.persist()
              this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.A, this.props._step)
            }} />

          </div>


          <label>Set image or text</label>

          <div id="toogler-image-or-text" className='toogler'>

            <input type="checkbox" id='id-image_mode_on' name='image_mode_on' className="checkbox" checked={defaultValues?.image_mode_on || this.state.image_mode_on} 

            onChange={(e) => {

              this.IMGorTEXT(e)
              

              const innerText = this.innerText?.current
              const imageContainer = this.imageContainer?.current
          
              console.log(innerText?.children)
              console.log(imageContainer?.children);

              let children = innerText?.children || imageContainer?.children

              // Placing nested children in nested
              let nested = [];
              [...children].forEach(child => {
                if(![...child.children].length > 0) return
                // console.log('-->',[...child.children])
                let children = [...child.children]
                // console.log(children)
                nested = [...children, ...nested]

              });

              // console.log([...children, ...nested])
              
              const inputNames = Array.from([...children, ...nested]).filter((element) => {
                return element.tagName.toLowerCase() === 'input'
              }).map((input) => {
                return input.name;
              });
          
              console.log({inputNames})



              this.props.innerHandleChangeToogleDeleteFields(e, SECTION_TYPES.A, this.props._step, defaultValues?.image_mode_on || this.state.image_mode_on, inputNames)

              this.props.innerHandleChange(e, SECTION_TYPES.A, this.props._step)


            }} 
            />
            <label style={{ justifyContent: lr_image_or_text }} htmlFor='id-image_mode_on' className="switch">
              <span>{defaultValues?.image_mode_on || this.state.image_mode_on ? `IMG` : `TEXT`}</span>
            </label>
          </div>


          {defaultValues?.image_mode_on || this.state.image_mode_on ?
            <React.Fragment>
            {/* <label>Set integrated image</label>             */}
            {/* <input name="imgfield" value={this.props.defaultValues?.imgfield || ""} type="text" placeholder="img field test"
              onChange={(e) => {
                e.persist()
                this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.A, this.props._step)
              }}
              required /> */}
              <div ref={this.imageContainer} id="create-article-form-id" className="form">
                <IMG
                  _step={this.props._step}
                  _last_step={this.props._last_step}
                  _previousStep={this.props._previousStep}
                  _nextStep={this.props._nextStep}

                  nested_data={this.props.nested_data}
                  innerHandleChange={this.props.innerHandleChange}
                  encapsulated_by_a={true}
                />
              </div>
            </React.Fragment>
            : 
            <React.Fragment>
              <div ref={this.innerText} id='inner-text'>
                <label>A's inner text:</label>
                <input name="A_innerText" value={defaultValues?.A_innerText || ""} type="text" placeholder="A inner text"
                  onChange={(e) => {
                    e.persist()
                    this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.A, this.props._step)
                  }}
                  required />
              </div>
            </React.Fragment>
          }


        </div>

      </React.Fragment >
    )
  }
}

export default A