
class Part2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  render() {
    return (
      <React.Fragment>
        <div>Part2</div>

        <div id='previous'>
          <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
          <button onClick={(e) => this.props.previousStep()}>Previous </button>
        </div>


        <div id='proceed'>
          <button onClick={(e) => this.props.nextStep()}>Proceed</button>
          <img src="/img/SVG/operations/create-article/proceed.svg" alt="" />
        </div>


      </React.Fragment>
    )
  }
}

export default Part2