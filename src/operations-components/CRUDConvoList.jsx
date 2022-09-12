import React from "react"

class CRUDConvoList extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  contrucConvoList(){
    console.log(this.props.msg_stream)
    if (this.props.msg_stream) {
      let PageConvoElements = this.props.msg_stream.map((msg, i) => {
        return <ConvoElement
          key={i}
          msg={msg}
          handleClick={this.props.handleClick} 
        />
      })
      return PageConvoElements
    } else {
      console.error(`this.props.msg_stream resolved to a false for some reason`)
      return null
    }
  }
  render(){
    let PageConvoElements = this.contrucConvoList()
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
  }

  // async deleteAMessage(msg, e){
  //   e.preventDefault()
  //   console.log(e)
  //   // console.log("delete", msg)

  //   const response = await fetch(`${process.env.ROOT}/operations/deletions/message/${this.props.msg.sender._id}/${this.props.msg.receiver._id}/${this.props.msg._id}`, {
  //     method: 'DELETE',
  //   })

  //   let serverOBJ = await response.json()

  //   console.log(response)
  //   console.log(serverOBJ)
  // }

  render() {
    return (
      <React.Fragment>

        <div className="a-single-msg-wrapper">
          {/* Need to add D */}
          {JSON.stringify(this.props.msg)}
          <button onClick={(e) => this.props.handleClick(this.props.msg, e)}>Delete</button>
        </div>

      </React.Fragment>

    );
  }
}




export default CRUDConvoList