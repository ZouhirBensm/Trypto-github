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

  deleteAMessage(msg, e){
    e.preventDefault()
    console.log(e)
    console.log("delete", msg)
  }

  render() {
    return (
      <React.Fragment>

        <div>
          {/* Need to add D */}
          {JSON.stringify(this.props.msg)}
          <button onClick={(e) => this.deleteAMessage(this.props.msg, e)}>Delete</button>
        </div>

      </React.Fragment>

    );
  }
}




export default CRUDConvoList