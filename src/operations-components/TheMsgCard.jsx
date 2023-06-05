import './styles/TheMsgCard.css'

class TheMsgCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log("this.props.msg", this.props.msg, this.props.position)
  }

  componentDidUpdate(prevProps) {
    console.log('Hello', prevProps.page)
    let section = document.getElementsByClassName("section")[this.props.position]
    let image = document.querySelectorAll('div#collapsable> img')[this.props.position]

    if (section.style.display === "block") {
      section.style.display = "none";

      // ROTATE THE CONCERNED IMAGE
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      // Get the 2D drawing context of the canvas
      var ctx = canvas.getContext('2d');

      // Rotate the canvas by 180 degrees
      ctx.rotate(Math.PI);

      // Draw the image on the canvas (rotated)
      ctx.drawImage(image, -image.width, -image.height);

      // Get the rotated image as a base64-encoded data URL
      var rotatedImageURL = canvas.toDataURL();

      // Update the source of the image element with the rotated image
      image.src = rotatedImageURL;
    }
  }

  // componentDidMount(){
  //   let section = document.getElementsByClassName("section")[this.props.position]
  //   section.style.display = "none";
  // }

  collapse() {
    let image = document.querySelectorAll('div#collapsable> img')[this.props.position]


    // ROTATE THE CONCERNED IMAGE
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    // Get the 2D drawing context of the canvas
    var ctx = canvas.getContext('2d');

    // Rotate the canvas by 180 degrees
    ctx.rotate(Math.PI);

    // Draw the image on the canvas (rotated)
    ctx.drawImage(image, -image.width, -image.height);

    // Get the rotated image as a base64-encoded data URL
    var rotatedImageURL = canvas.toDataURL();

    // Update the source of the image element with the rotated image
    image.src = rotatedImageURL;



    let section = document.getElementsByClassName("section")[this.props.position]
    // section.style.display = "none";

    if (section.style.display === "none") {

      section.style.display = "block";


    } else {
      section.style.display = "none";
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="a-single-msg-wrapper">


          <div id="collapsable" onClick={(e) => { this.collapse() }}>
            <span>Message: </span>
            <span>{this.props.msg.text} </span>
            <img src="/img/SVG/operations/monitor-messages/drop.svg" alt="" />
          </div>

        </div>


        <div style={{ display: "none" }} className="section">

          <ul>
            <li>
              <span>Sender: </span>
              <span>{this.props.msg.sender.email}</span>
            </li>
            <li>
              <span>Receiver: </span>
              <span>{this.props.msg.receiver.email}</span>
            </li>
            <li>
              <span>Posted Date: </span>
              <span>{this.props.msg.postedDate}</span>
            </li>
          </ul>


          <button onClick={(e) => { this.props.handleClick(this.props.msg, e); this.collapse() }}>
            <img src="/img/SVG/operations/monitor-messages/trash.svg" alt="" />
          </button>

        </div>

      </React.Fragment>

    )
  }
}

export default TheMsgCard