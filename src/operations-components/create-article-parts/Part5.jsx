
class Part5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  render() {
    return (
      <React.Fragment>
        <div>Part5</div>

        <div id='previous'>
          <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
          <button onClick={(e) => this.props.previousStep()}>Previous </button>
        </div>


      </React.Fragment>
    )
  }
}

export default Part5