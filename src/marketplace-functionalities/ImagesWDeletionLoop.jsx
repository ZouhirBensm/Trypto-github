import ImagesDeletion from "./ImagesDeletion"


class ImagesWDeletionLoop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount(prevProps, prevState) {
    // console.log("componentDidMount()->ImagesWDeletionLoop: ", this.props)

  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate()->ImagesWDeletionLoop: ", this.props)

  }


  render() {

    let ImagesDeletionComp = this.props.filelist.map((File, index) => {
      return <ImagesDeletion
        key={index}
        file={File}
        reduceimage={this.props.reduceimage}
      />
    })

    console.log("render()->ImagesWDeletionLoop: ", ImagesDeletionComp)

    return (
      <React.Fragment>

        {ImagesDeletionComp}
      </React.Fragment>
    )
  }
}




export default ImagesWDeletionLoop