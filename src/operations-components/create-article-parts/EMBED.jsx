import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'

class EMBED extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {

    let objIndex = this.props.nested_data?.findIndex((obj => {
      return (obj.type == SECTION_TYPES.EMBED && obj.id == this.props._step)
    }));

    // let object = this.props.nested_data?.find((object)=>{return object.type == this.constructor.name})
    let defaultValues

    if(objIndex != -1) {
      defaultValues = this.props.nested_data[objIndex]
    }


    return (
      <React.Fragment>
        <h3>Embeded video:</h3>
        
        <div id="create-article-form-id" className="form">

        
        <label>Embed width: </label>
        <input name="embed_width" value={defaultValues?.embed_width || ""} type="number" placeholder="Enter embed's width" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
          }}/>


        <label>Embed height: </label>
        <input name="embed_height" value={defaultValues?.embed_height || ""} type="number" placeholder="Enter embed's height" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
          }}/>

        <label>Embed type: </label>
        <input name="embed_type" value={defaultValues?.embed_type || ""} type="text" placeholder="Enter embed's type" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
          }}/>

        <label>Embed source: </label>
        <input name="embed_source" value={defaultValues?.embed_source || ""} type="text" placeholder="Enter embed's source" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
          }} required/>

        <label>Embed title: </label>
        <input name="embed_title" value={defaultValues?.embed_title || ""} type="text" placeholder="Enter embed's title" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
          }}/>






        </div>

      </React.Fragment>
    )
  }
}

export default EMBED