import ImagesDeletion from "./ImagesDeletion"
// import Loading from "../generic-components/Loading"
// import Image from "./Image2"

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

    let ImagesDeletion = this.props.filelist.map((File, index) => {
      return <ImagesDeletion
        key={index}
        file={File}
        reduceimage={this.props.reduceimage}
      />
    })

    console.log("render()->ImagesWDeletionLoop: ", ImagesDeletion)

    return (
      <React.Fragment>

        {ImagesDeletion}
      </React.Fragment>
    )
  }
}




export default ImagesWDeletionLoop



