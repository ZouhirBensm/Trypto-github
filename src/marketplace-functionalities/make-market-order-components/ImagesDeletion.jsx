class ImagesDeletion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount(prevProps, prevState) {
    this.init()
  }

  componentDidUpdate(prevProps, prevState) {
    this.init()
  }

  init() {

    var reader = new FileReader();

    console.log("\n\ninit()->ImagesWDeletion2: ", this.props)
    let div = document.getElementById(`inhere-${this.props.file.name}`)



    let divChildren = div.children
    console.log(div.id, div.parentElement.parentElement.id, divChildren)

    div.innerHTML = ""


    reader.onload = function (e) {
      var image = document.createElement("img");
      image.className = 'img'
      image.src = e.target.result;
      div.appendChild(image);
      return
    }

    reader.readAsDataURL(this.props.file);


  }

  render() {
    return (
      <div id={`${this.props.file.name}-e`} className='empty'>
        <div id={`${this.props.file.name}f`} className='fill'>

          <div id={`inhere-${this.props.file.name}`}>{this.props.file.name}</div>

          <button className='reduce-button' onClick={(e) => {
            e.preventDefault()
            let reduceimage = this.props.reduceimage(this.props.file.name, e)
            return
          }}>Del {this.props.file.name}</button>
        </div>
      </div>
    )
  }
}

export default ImagesDeletion