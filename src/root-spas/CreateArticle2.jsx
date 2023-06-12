import '../style/reactDivMobile.css'

import loadable from "@loadable/component";
import Loading from "../generic-components/Loading"



const Part1 = loadable(() => import("../operations-components/create-article-parts/Part1"), {
  fallback: <Loading />
});
const Part2 = loadable(() => import("../operations-components/create-article-parts/Part2"), {
  fallback: <Loading />
});
const Part3 = loadable(() => import("../operations-components/create-article-parts/Part3"), {
  fallback: <Loading />
});
const Part4 = loadable(() => import("../operations-components/create-article-parts/Part4"), {
  fallback: <Loading />
});
const Part5 = loadable(() => import("../operations-components/create-article-parts/Part5"), {
  fallback: <Loading />
});


class CreateArticle extends React.Component {
  constructor() {
    super()
    this.state = {
      step: 1,
      data1: "",
      data2: "",
      data3: "",
      data4: "",
      data5: "",
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.setStateStep = this.setStateStep.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  setStateStep(step) {
    this.setState({
      step: step
    })
  }

  nextStep(e) {
    this.setState({
      step: ++this.state.step
    })
  }
  previousStep(e) {
    this.setState({
      step: --this.state.step
    })
  }

  // handleChange(input, e) {
  //   console.log("in parent", e.target.value)
  //   this.setState({
  //     [input]: e.target.value
  //   })
  // }


  render() {
    let component

    switch (this.state.step) {
      case 1:
        component = <Part1 
        step={this.state.step}
        setStateStep={this.setStateStep}  
        nextStep={this.nextStep} 
        />
        break;
      case 2:
          component = <Part2
          step={this.state.step}
          setStateStep={this.setStateStep}  
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          />
          break;
        case 3:
          component = <Part3
          step={this.state.step}
          setStateStep={this.setStateStep}  
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          />
          break;
        case 4:
          component = <Part4
          step={this.state.step}
          setStateStep={this.setStateStep}  
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          />
          break;
        case 5:
          component = <Part5
          step={this.state.step}
          setStateStep={this.setStateStep}  
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          />
          break;
      default:
        component = null
        break;
    }
    return (
      <React.Fragment>
        <div id='create-article'>
          <div id="nest-1">
            {this.state.step != 5 ?
              <a id='reset' href="/operations/create-article">
                {/* TODO change src */}
                <img src="/img/SVG/operations/create-article/reset.svg" alt="" />
                <span>Reset</span>
              </a> : null}

            {component}
          </div>
        </div>
        
      </React.Fragment>
    )
  }
}


const element = <CreateArticle />;

ReactDOM.render(element, document.getElementById('react-div'));

export default CreateArticle

