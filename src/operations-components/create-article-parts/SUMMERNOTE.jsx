import './styles/SUMMERNOTE.css'
import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'

class SUMMERNOTE extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    var props = this.props
    var constructorName = this.constructor.name

    $('#summernote').summernote({
      placeholder: 'Edit content',
      tabsize: 2,
      height: 300
    });

    // Set onchange event handler
    $('#summernote').on('summernote.change', function (e) {
      // Handle the onchange event here
      var editorData = $(this).summernote('code');
      console.log(editorData, e); // Display editor content in the console
      
      
      
      props.innerHandleChange(e, constructorName, props._step)
      // You can perform further actions with the changed editor data here
    });
    // $(document).ready(function () {
    // });


    let objIndex = this.props.nested_data?.findIndex((obj => {
      return (obj.type == SECTION_TYPES.SUMMERNOTE && obj.id == this.props._step)
    }));

    // let object = this.props.nested_data?.find((object)=>{return object.type == this.constructor.name})
    let defaultValues

    if(objIndex == -1) {
      return
    }

    defaultValues = this.props.nested_data[objIndex]

    

    $('#summernote').summernote('code', defaultValues.SUMMERNOTE_innerHTML);


  }
  render() {




    return (
      <React.Fragment>
        <h3>Summernote:</h3>

        <div id="create-article-form-id" className="form">


          <label>Set your blog's content: </label>
          <br />

          {/* <textarea name="P_innerHTML" value={defaultValues?.P_innerHTML || ""} placeholder="Enter P inner HTML" onChange={(e) => {
            e.persist()
            this.props.innerHandleChange(e.nativeEvent, this.constructor.name, this.props._step)
          }} required /> */}

          <textarea id="summernote" name="SUMMERNOTE_innerHTML" required></textarea>

          <button onClick={(e) => {
            e.preventDefault()
            var editorData = $('#summernote').summernote('code');
            console.log(editorData);
          }}>See</button>


        </div>

      </React.Fragment>
    )
  }
}

export default SUMMERNOTE