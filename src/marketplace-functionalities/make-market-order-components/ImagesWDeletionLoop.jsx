import ImagesDeletion from "./ImagesDeletion"


class ImagesWDeletionLoop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate(prevProps) {
    var imagesContainer = document.getElementById('images-container')
    
    if (this.props.filelist != 0) {
      imagesContainer.style.border = '1px solid #B8CEF5'
    } else {
      imagesContainer.style.border = 'none'
    }
  }

  componentDidMount(){
    if (this.props.filelist.length == 0) {
      var imagesContainer = document.getElementById('images-container')
      imagesContainer.style.border = 'none'
    }
  }


  render() {

    console.log("----->", this.props.filelist)

    let ImagesDeletionComp = this.props.filelist.map((File, index) => {
      return <ImagesDeletion
        key={index}
        file={File}
        reduceimage={this.props.reduceimage}
      />
    })

    // console.log("render()->ImagesWDeletionLoop: ", ImagesDeletionComp)

    return (
      <React.Fragment>
        {ImagesDeletionComp}
      </React.Fragment>
    )
  }
}




export default ImagesWDeletionLoop