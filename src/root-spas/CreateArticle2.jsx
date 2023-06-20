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
      // step: 1,
      // // STEP 1
      // html_title: "",
      // meta_title: "",
      // meta_description: "",
      // canonical: "",
      // noindex: false,
      // nofollow: false,
      // // STEP 2
      // keywords: [],
      // category: "",
      // // publisher name, email, and link are default values for now
      // banner_image_name: undefined,
      // banner_image_file: undefined,
      // // banner_image_path
      // banner_img_alt: "",
      // h1: "",
      // // author is logged in username
      // // published_datetime is default now upon creation
      // content: "Content of the article goes here. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi molestias, molestiae vero tenetur minima magnam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi molestias, molestiae vero tenetur minima magnam."


      // // _____________________________________________________



      // USED TO TEST CREATE QUICKLY
      step: 3,
      html_title: "Some random title", // CHECK (ArticleHeadTag)
      meta_title: "Some random title2",
      meta_description: "Some random description", // CHECK (ArticleHeadTag)
      canonical: "", // CHECK (ArticleHeadTag)
      noindex: false, // CHECK (ArticleHeadTag)
      nofollow: false, // CHECK (ArticleHeadTag)
      keywords: ['opti for this', 'and for that'], // CHECK (ArticleBodyHeader)
      // category: "bitcoin", // CHECK (ArticleBodyHeader)
      category: "bitcoin", // CHECK (ArticleBodyHeader)
      banner_img_alt: "some alt txt for the image", // CHECK (ArticleBodyHeader)
      h1: "The H1 title", // CHECK (ArticleBodyHeader)
      content: "Content of the article goes here. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi molestias, molestiae vero tenetur minima magnam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi molestias, molestiae vero tenetur minima magnam.", // CHECK (Article)


      // banner_image_path
      banner_image_file: undefined, // CHECK (ArticleEnclosureImage)
      banner_image_name: undefined, // NO NEED TO SAVE

      // // _____________________________________________________


      // ALL HARD CODED FOR NOW
      // publisher name, 
      // publisher email, 
      // and publisher link
      // author name
      // author link


      // published_datetime is default now upon creation // CHECK (Article)
      // excerpt //CHECK (Article)
      // Article's path link // CHECK (ArticleHeadTag)

    }

    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.setStateStep = this.setStateStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.setStateBannerImage = this.setStateBannerImage.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }


  handleChange = (e) => {

    const undefined_fields = ['canonical']

    console.log("\n\ne.target.name: ", e.target.name)

    console.log("\n\ne.target.value: ", e.target.value)

    this.setState({
      [e.target.name]: e.target.value
    })
    return
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

  setStateBannerImage = (banner_image_name, banner_image_file) => {
    this.setState({
      banner_image_name: banner_image_name,
      banner_image_file: banner_image_file,
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
          validateInputs={this.validateInputs}

          html_title={this.state.html_title}
          meta_title={this.state.meta_title}
          meta_description={this.state.meta_description}
          canonical={this.state.canonical}
          noindex={this.state.noindex}
          nofollow={this.state.nofollow}
        />
        break;
      case 2:
        component = <_2_SetArticleBodyHeader
          step={this.state.step}
          handleChange={this.handleChange}
          handleChange2={this.handleChange2}
          setStateBannerImage={this.setStateBannerImage}
          validateInputs={this.validateInputs}

          setStateStep={this.setStateStep}
          previousStep={this.previousStep}
          nextStep={this.nextStep}

          keywords={this.state.keywords}
          category={this.state.category}
          banner_img_alt={this.state.banner_img_alt}
          h1={this.state.h1}

          banner_image_name={this.state.banner_image_name}
          banner_image_file={this.state.banner_image_file}
        />
        break;
      case 3:
        component = <Part3
          step={this.state.step}
          setStateStep={this.setStateStep}
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          setStateBannerImage={this.setStateBannerImage}

          html_title={this.state.html_title}
          meta_title={this.state.meta_title}
          meta_description={this.state.meta_description}
          canonical={this.state.canonical}
          noindex={this.state.noindex}
          nofollow={this.state.nofollow}
          keywords={this.state.keywords}
          category={this.state.category}
          banner_img_alt={this.state.banner_img_alt}
          h1={this.state.h1}
          banner_image_name={this.state.banner_image_name}
          banner_image_file={this.state.banner_image_file}
          content={this.state.content}
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


  validateInputs(e) {
    const inputs = document.getElementsByTagName('input');
    const selects = document.getElementsByTagName('select');

    let isValid = true;

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.required && !input.checkValidity()) {
        // Input is invalid, trigger validation error message
        input.reportValidity();
        isValid = false;
        break
      }
    }

    for (let i = 0; i < selects.length; i++) {
      const select = selects[i];
      if (select.required && !select.checkValidity()) {
        // Input is invalid, trigger validation error message
        select.reportValidity();
        isValid = false;
        break
      }
    }

    if (isValid) {
      // All inputs are valid, perform desired action
      console.log('VALID');
      return true;
    } else {
      return false;
    }
  }


}


const element = <CreateArticle />;

ReactDOM.render(element, document.getElementById('react-div'));

export default CreateArticle

