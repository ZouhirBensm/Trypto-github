import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'


class H2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    console.log('H2->this.props.nested_data\n', this.props.nested_data)

    let objIndex = this.props.nested_data?.findIndex((obj => {
      return (obj.type == SECTION_TYPES.H2 && obj.id == this.props._step)
    }));

    // let object = this.props.nested_data?.find((object)=>{return object.type == SECTION_TYPES.H2})
    let defaultValues

    if(objIndex != -1) {
      defaultValues = this.props.nested_data[objIndex]
    }

    console.log("H2->defaultValues\n" ,defaultValues)


    return (
      <React.Fragment>
        <h3>H2 Component Setter:</h3>
        
        <div id="create-article-form-id" className="form">

        
        <label>H2's inner HTML: </label>
        <input name="H2_innerHTML" value={defaultValues?.H2_innerHTML || ""} type="text" placeholder="Enter H2 inner HTML" onChange={(e)=> {
          console.log('H2 onchange...')
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, SECTION_TYPES.H2, this.props._step)
          }} required/>

        </div>

      </React.Fragment>
    )
  }
}

export default H2