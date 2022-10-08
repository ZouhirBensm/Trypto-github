import React from "react"

class TheMsgCard extends React.Component {
  constructor(props){
    super(props)
    this.state={}
    console.log("this.props.msg", this.props.msg, this.props.position)
  }
  collapse(){
    let section = document.getElementsByClassName("section")[this.props.position]
    // section.style.display = "none";

    if (section.style.display === "none") {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  }

  render(){
    return (
      <React.Fragment>
        <div onClick={(e)=>{this.collapse()}}>Message: {this.props.msg.text}</div>
        <div style={{display: "none"}} className="section">
          <ul>
            <li>Sender: {this.props.msg.sender.email}</li>
            <li>Receiver: {this.props.msg.receiver.email}</li>
            <li>Posted Date: {this.props.msg.postedDate}</li>
          </ul>
        </div>
      </React.Fragment>

    )
  }
}

export default TheMsgCard