import React from "react"

class AssociatedLocation extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <React.Fragment>
        <div>AssociatedLocation...</div>
        <button onClick={(e) => this.props.setStateStep(1)}> Previous </button>
        <button onClick={(e) => this.props.setStateStep(3)}> Next </button>
      </React.Fragment>
    )
  }
}

export default AssociatedLocation