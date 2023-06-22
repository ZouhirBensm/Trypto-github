
class Deux extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        <div>Deux...</div>

        <div id='nav'>
          <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
          <button onClick={(e) => this.props._previousStep()}>_Previous </button>
          <button onClick={(e) => {this.props._nextStep(e)}}>_Proceed</button>
          <img src="/img/SVG/operations/create-article/proceed.svg" alt="" />
        </div>

      </React.Fragment>
    )
  }
}

export default Deux