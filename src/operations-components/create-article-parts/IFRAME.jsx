import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'

class IFRAME extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {

    let objIndex = this.props.nested_data?.findIndex((obj => {
      return (obj.type == SECTION_TYPES.IFRAME && obj.id == this.props._step)
    }));

    // let object = this.props.nested_data?.find((object)=>{return object.type == SECTION_TYPES.IFRAME})
    let defaultValues

    if(objIndex != -1) {
      defaultValues = this.props.nested_data[objIndex]
    }


    return (
      <React.Fragment>
        <h3>iframe video:</h3>
        
        <div id="create-article-form-id" className="form">

        
        <label>iframe width: </label>
        <input name="iframe_width" value={defaultValues?.iframe_width || ""} type="number" placeholder="Enter iframe's width" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.IFRAME, this.props._step)
          }}/>


        <label>iframe height: </label>
        <input name="iframe_height" value={defaultValues?.iframe_height || ""} type="number" placeholder="Enter iframe's height" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.IFRAME, this.props._step)
          }}/>

        {/* <label>iframe type: </label>
        <input name="iframe_type" value={defaultValues?.iframe_type || ""} type="text" placeholder="Enter iframe's type" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.IFRAME, this.props._step)
          }}/> */}

        <label>iframe source: </label>
        <input name="iframe_source" value={defaultValues?.iframe_source || ""} type="text" placeholder="Enter iframe's source" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.IFRAME, this.props._step)
          }} required/>

        {/* <label>iframe title: </label>
        <input name="iframe_title" value={defaultValues?.iframe_title || ""} type="text" placeholder="Enter iframe's title" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.IFRAME, this.props._step)
          }}/> */}






        </div>

      </React.Fragment>
    )
  }
}

export default IFRAME