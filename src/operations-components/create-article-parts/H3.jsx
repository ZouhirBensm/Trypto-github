
class H3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {

    let objIndex = this.props.nested_data?.findIndex((obj => {return (obj.type == this.constructor.name && obj.id == this.props._step)}));

    // let object = this.props.nested_data?.find((object)=>{return object.type == this.constructor.name})
    let defaultValues

    if(objIndex != -1) {
      defaultValues = this.props.nested_data[objIndex]
    }


    return (
      <React.Fragment>
        <h3>H3 Component Setter:</h3>
        
        <div id="create-article-form-id" className="form">

        
        <label>H3's inner HTML: </label>
        <input name="H3_innerHTML" value={defaultValues?.H3_innerHTML || ""} type="text" placeholder="Enter H3 inner HTML" onChange={(e)=> {
          e.persist()
          this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
          }} required/>

        </div>

      </React.Fragment>
    )
  }
}

export default H3