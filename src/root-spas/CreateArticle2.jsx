import '../style/reactDivMobile.css'
import './styles/CreateArticle2.css'

import loadable from "@loadable/component";
import Loading from "../generic-components/Loading"







const _1_SetArticleHeadTagData = loadable(() => import("../operations-components/create-article-parts/_1_SetArticleHeadTagData"), {
  fallback: <Loading />
});
const _2_SetArticleBodyHeader = loadable(() => import("../operations-components/create-article-parts/_2_SetArticleBodyHeader"), {
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
      // STEP 1
      html_title: "",
      meta_description: "",
      canonical: undefined,
      noindex: false,
      nofollow: false,
      // STEP 2
      keywords: [],
      category: "",
      // publisher name, email, and link are default values for now
      // upload banner image (name, link)
      banner_img_alt: "",
      h1: "",
      // author is logged in username
      // published_datetime is default now upon creation

    }

    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.setStateStep = this.setStateStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleChange = (e) => {
    console.log("\n\ne.target.name: ", e.target.name)

    console.log("\n\ne.target.value: ", e.target.value)

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChange2 = (e) => {
    console.log("\n\ne.target.name: ", e.target.name)

    console.log("\n\ne.target.value: ", e.target.value)

    let ARR = e.target.value.split(', ')

    console.log(ARR)

    this.setState({
      [e.target.name]: ARR
    })
  }


  handleCheck = (e) => {

    console.log("\n\ne.target.name: ", e.target.name)
    console.log("\n\ne.target.checked: ", e.target.checked)

    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  setStateStep(step) {
    this.setState({
      step: step
    })
  }

  nextStep = (e) => {
    this.setState({
      step: ++this.state.step
    })
  }
  previousStep = (e) => {
    this.setState({
      step: --this.state.step
    })
  }



  render() {
    let component

    switch (this.state.step) {
      case 1:
        component = <_1_SetArticleHeadTagData 
        handleChange={this.handleChange} 
        handleCheck={this.handleCheck} 
        setStateStep={this.setStateStep}  
        step={this.state.step}
        nextStep={this.nextStep}

        html_title={this.state.html_title}
        meta_description={this.state.meta_description}
        canonical={this.state.canonical}
        noindex={this.state.noindex}
        nofollow={this.state.nofollow}
        />
        break;
      case 2:
          component = <_2_SetArticleBodyHeader
          step={this.state.step}
          handleChange2={this.handleChange2} 
          setStateStep={this.setStateStep}  
          previousStep={this.previousStep}
          nextStep={this.nextStep}

          keywords={this.state.keywords}
          category={this.state.category}
          banner_img_alt={this.state.banner_img_alt}
          h1={this.state.h1}
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

