import loadable from "@loadable/component";
import Loading from "../../generic-components/Loading"

import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'


const H2 = loadable(() => import("./H2"), {
  fallback: <Loading />
});
const H3 = loadable(() => import("./H3"), {
  fallback: <Loading />
});
const P = loadable(() => import("./P"), {
  fallback: <Loading />
});
const UL = loadable(() => import("./UL"), {
  fallback: <Loading />
});
const A = loadable(() => import("./A"), {
  fallback: <Loading />
});
const IMG = loadable(() => import("./IMG"), {
  fallback: <Loading />
});
const SPAN = loadable(() => import("./SPAN"), {
  fallback: <Loading />
});
const EMBED = loadable(() => import("./EMBED"), {
  fallback: <Loading />
});



class Part5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _step: this.props.e?.target.innerHTML === 'Proceed'? 1 : this.props.e?.target.innerHTML === 'Previous'? this.props.content_structure.length: 1,
      _last_step: this.props.content_structure.length
    }

    console.log(this.props.content_structure, this.props.e?.target.innerHTML)

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

  componentFinder(content_structure_element) {
    let component

    switch (content_structure_element) {
      case SECTION_TYPES.H2:
        component = <H2
          _step={this.state._step}
          _last_step={this.state._last_step}
          _previousStep={this._previousStep}
          _nextStep={this._nextStep}
        />
        break;
      case SECTION_TYPES.H3:
          component = <H3
            _step={this.state._step}
            _last_step={this.state._last_step}
            _previousStep={this._previousStep}
            _nextStep={this._nextStep}
          />
          break;
      case SECTION_TYPES.P:
        component = <P
          _step={this.state._step}
          _last_step={this.state._last_step}
          _previousStep={this._previousStep}
          _nextStep={this._nextStep}
        />
        break;
      case SECTION_TYPES.UL:
        component = <UL
          _step={this.state._step}
          _last_step={this.state._last_step}
          _previousStep={this._previousStep}
          _nextStep={this._nextStep}
        />
        break;
      case SECTION_TYPES.A:
        component =<A
          _step={this.state._step}
          _last_step={this.state._last_step}
          _previousStep={this._previousStep}
          _nextStep={this._nextStep}
        />
        break;
      case SECTION_TYPES.IMG:
        component =<IMG
          _step={this.state._step}
          _last_step={this.state._last_step}
          _previousStep={this._previousStep}
          _nextStep={this._nextStep}
        />
        break;
      case SECTION_TYPES.SPAN:
        component =<SPAN
          _step={this.state._step}
          _last_step={this.state._last_step}
          _previousStep={this._previousStep}
          _nextStep={this._nextStep}
        />
        break;
      case SECTION_TYPES.EMBED:
        component =<EMBED
          _step={this.state._step}
          _last_step={this.state._last_step}
          _previousStep={this._previousStep}
          _nextStep={this._nextStep}
        />
        break;


      default:
        break;
    }


    return component
  }


  render() {
    let component = this.componentFinder(this.props.content_structure[this.state._step - 1])

    return (
      <React.Fragment>
        <div>Part5</div>

        {component}


        <div id='nav'>

          {this.state._step == 1 ? null :
            <React.Fragment>
              <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
              <button onClick={(e) => this._previousStep()}>_Previous </button>
            </React.Fragment>
          }

          {this.state._step == this.state._last_step ? null :
            <React.Fragment>
              <button onClick={(e) => { this._nextStep(e) }}>_Proceed</button>
              <img src="/img/SVG/operations/create-article/proceed.svg" alt="" />
            </React.Fragment>
          }



        </div>



        <div id='nav'>
          {this.state._step == 1 ?
            <React.Fragment>
              <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
              <button onClick={(e) => this.props.previousStep()}>Previous </button>
            </React.Fragment> : null
          }

          {this.state._step == this.state._last_step ?
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