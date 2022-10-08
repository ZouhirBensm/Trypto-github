import React from "react"
import TheMsgCard from "./TheMsgCard"

class CRUDConvoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // console.log("constructor: ", this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate: ", nextProps.msg_stream)
    if (nextProps.msg_stream) {
      console.log("shouldComponentUpdate: true", nextProps.msg_stream)
      return true
    } else {
      return false
    }
  }



  contrucConvoList() {
    console.log("contrucConvoList????")
    // console.log("contrucConvoList: ", this.props)
    if (this.props.msg_stream) {
      let PageConvoElements = this.props.msg_stream.map((msg, i) => {
        return <ConvoElement
          key={i}
          msg={msg}
          handleClick={this.props.handleClick}
          position={i}
        />
      })
      return PageConvoElements
    } else {
      console.error(`this.props.msg_stream resolved to a false for some reason`)
      return null
    }

  }
  render() {
    console.log("child render")
    let PageConvoElements
    PageConvoElements = this.contrucConvoList()
    console.log(PageConvoElements)
    return (
      <React.Fragment>
        <div>CRUDConvoList...</div>
        <div className="wrapper-page-convo-elements">
          {PageConvoElements}
        </div>
      </React.Fragment>
    )
  }
}

class ConvoElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // console.log("ConvoElement----->>>> ", this.props.msg)
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextProps.msg) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  // async deleteAMessage(msg, e){
  //   e.preventDefault()
  //   console.log(e)
  //   // console.log("delete", msg)

  //   const response = await fetch(`/operations/deletions/message/${this.props.msg.sender._id}/${this.props.msg.receiver._id}/${this.props.msg._id}`, {
  //     method: 'DELETE',
  //   })

  //   let serverOBJ = await response.json()

  //   console.log(response)
  //   console.log(serverOBJ)
  // }

  render() {
    console.log("ConvoElement", this.props.msg, this.props.position)

    return (

      <React.Fragment>

        {/* {this.props.msg.text}<br/> */}

        <TheMsgCard
          msg={this.props.msg}
          position={this.props.position}
        />







        {/* <div className="a-single-msg-wrapper">
          {JSON.stringify(this.props.msg.text)}
          <button onClick={(e) => this.props.handleClick(this.props.msg, e)}>Delete</button>
        </div> */}

      </React.Fragment>

    );
  }
}




export default CRUDConvoList