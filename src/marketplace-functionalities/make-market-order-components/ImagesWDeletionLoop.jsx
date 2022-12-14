import ImagesDeletion from "./ImagesDeletion"


class ImagesWDeletionLoop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {

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