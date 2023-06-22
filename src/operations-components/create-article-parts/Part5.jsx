
class Part5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // content_steps: 1
    }

    console.log(this.props.content_structure)
  }


  render() {
    return (
      <React.Fragment>
        <div>Part5</div>

        <div id='nav'>
          <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
          <button onClick={(e) => this.props.previousStep()}>Previous </button>
          <button onClick={(e) => this.props.nextStep()}>Proceed</button>
          <img src="/img/SVG/operations/create-article/proceed.svg" alt="" />
        </div>

      </React.Fragment>
    )
  }

}

export default Part5