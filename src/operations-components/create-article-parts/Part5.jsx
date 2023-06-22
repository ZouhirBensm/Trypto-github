import loadable from "@loadable/component";
import Loading from "../../generic-components/Loading"

const Un = loadable(() => import("./Un"), {
  fallback: <Loading />
});
const Deux = loadable(() => import("./Deux"), {
  fallback: <Loading />
});
const Trois = loadable(() => import("./Trois"), {
  fallback: <Loading />
});



class Part5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _step: 1,
      last_step: this.props.content_structure.length
    }

    console.log(this.props.content_structure)

    this._nextStep = this._nextStep.bind(this)
    this._previousStep = this._previousStep.bind(this)
    this._setStateStep = this._setStateStep.bind(this)
  }

  _setStateStep(_step) {
    this.setState({
      _step: _step
    })
  }

  _nextStep = (e) => {
    this.setState({
      _step: ++this.state._step
    })
  }
  _previousStep = (e) => {
    this.setState({
      _step: --this.state._step
    })
  }

  componentStep(_step) {
    let component
    switch (_step) {
      case 1:
        component = <Un
          _step={_step}
          _setStateStep={this._setStateStep}
          _previousStep={this._previousStep}
          _nextStep={this._nextStep}
        />
        break;
      case 2:
        component = <Deux
          _step={_step}
          _setStateStep={this._setStateStep}
          _previousStep={this._previousStep}
          _nextStep={this._nextStep}
        />
        break;
      case 3:
        component = <Trois
          _step={_step}
          _setStateStep={this._setStateStep}
          _previousStep={this._previousStep}
          _nextStep={this._nextStep}
        />
        break;
      default:
        component = null
        break;
    }

    return component
  }


  render() {
    let component = this.componentStep(this.state._step)

    return (
      <React.Fragment>
        <div>Part5</div>

        {component}

        <div id='nav'>
          {this.state._step == 1 ?
            <React.Fragment>
              <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
              <button onClick={(e) => this.props.previousStep()}>Previous </button>
            </React.Fragment> : null
          }

          {this.state._step == this.state.last_step ?
            <React.Fragment>
              <button onClick={(e) => this.props.nextStep()}>Proceed</button>
              <img src="/img/SVG/operations/create-article/proceed.svg" alt="" />
            </React.Fragment> : null
          }


        </div>

      </React.Fragment>
    )
  }

}

export default Part5