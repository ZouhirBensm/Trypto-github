
class Part1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  render() {
    return (
      <React.Fragment>
        <div>Part1</div>

          <div id='proceed'>
            <button onClick={(e) => this.props.nextStep()}>Proceed</button>
            <img src="/img/SVG/operations/create-article/proceed.svg" alt="" />
          </div>
      </React.Fragment>
    )
  }
}

export default Part1