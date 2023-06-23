import '../style/reactDivMobile.css'
import './styles/CreateArticle2.css'
import SECTION_TYPES from '../../full-stack-libs/Types/ArticleSectionTypes'

import loadable from "@loadable/component";
import Loading from "../generic-components/Loading"







const _1_SetArticleHeadTagData = loadable(() => import("../operations-components/create-article-parts/_1_SetArticleHeadTagData"), {
  fallback: <Loading />
});
const _2_SetArticleBodyHeader = loadable(() => import("../operations-components/create-article-parts/_2_SetArticleBodyHeader"), {
  fallback: <Loading />
});
const _3_Abstract = loadable(() => import("../operations-components/create-article-parts/_3_Abstract"), {
  fallback: <Loading />
});
const _4_ContentStructure = loadable(() => import("../operations-components/create-article-parts/_4_ContentStructure"), {
  fallback: <Loading />
});
const _5_NestedContentBuilder = loadable(() => import("../operations-components/create-article-parts/_5_NestedContentBuilder"), {
  fallback: <Loading />
});
const Part6 = loadable(() => import("../operations-components/create-article-parts/Part6"), {
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
      // content: "Content of the article goes here. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi molestias, molestiae vero tenetur minima magnam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi molestias, molestiae vero tenetur minima magnam.",
      // abstract_name_type: "",
      // abstract_points: [],
      // content_structure: undefined


      // // _____________________________________________________


      // TEMPORAL
      // USED TO TEST CREATE QUICKLY
      step: 4,
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

      abstract_name_type: "Resume",
      abstract_points: [
        "Lorem, ipsum",
        "dolor <strong>sit amet consectetur</strong> adipisicing",
        "elit. <strong>Eum</strong> aspernatur<strong> cupiditate</strong>",
        "<strong>atque</strong> culpa deleniti cum nesciunt eveniet"
      ],
      content_structure: ["H2", "H3", "P"],
      e: undefined,
      nested_data: []

      
      
      
      
      
      
      
      
      
      
      
      
      

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
    // this.handleChange2 = this.handleChange2.bind(this)
    this.setStateBannerImage = this.setStateBannerImage.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }


  handleChange = (e, input_name_val_object = undefined) => {
    console.log(input_name_val_object, e)

    // const undefined_fields = ['canonical']
    const should_be_set_as_array_state_elements = ['keywords', "abstract_points", "content_structure"]
    const parse_bidblock_to_strong_tag = ["abstract_points"]

    console.log("\n\ne.target.name: ", e.target?.name)

    console.log("\n\ne.target.value: ", e.target?.value)

    let stateValue = e.target?.value

    if (parse_bidblock_to_strong_tag.includes(e.target?.name)) {
      console.log('parsing...')
      stateValue = e.target?.value.replace(/\[/g, '<strong>').replace(/\]/g, '</strong>');
      // stateValue = JSON.stringify(stateValue);
    }

    if (should_be_set_as_array_state_elements.includes(e.target?.name)) {
      stateValue = stateValue.split(',  ')
    }
    console.log(stateValue)

    if (input_name_val_object) {
      this.setState({
        [input_name_val_object.name]: input_name_val_object.value
      })
      return
    }


    this.setState({
      [e.target?.name]: stateValue
    })
    return
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
    e?.persist();
    this.setState({
      step: ++this.state.step,
      e: e?.nativeEvent
    })
  }
  previousStep = (e) => {
    e?.persist();
    this.setState({
      step: --this.state.step,
      e: e?.nativeEvent
    })
  }

  componentStep(step) {
    let component
    switch (step) {
      case 1:
        component = <_1_SetArticleHeadTagData
          handleChange={this.handleChange}
          handleCheck={this.handleCheck}
          setStateStep={this.setStateStep}
          step={step}
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
          handleChange={this.handleChange}
          // handleChange2={this.handleChange2}
          setStateBannerImage={this.setStateBannerImage}
          validateInputs={this.validateInputs}
        
          step={step}
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
        component = <_3_Abstract
          step={step}
          setStateStep={this.setStateStep}
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          validateInputs={this.validateInputs}

          abstract_name_type={this.state.abstract_name_type}
          abstract_points={this.state.abstract_points}

        />
        break;
      case 4:
        component = <_4_ContentStructure
          step={step}
          setStateStep={this.setStateStep}
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          validateInputs={this.validateInputs}

          content_structure={this.state.content_structure}
        />
        break;
      case 5:
        component = <_5_NestedContentBuilder
          step={step}
          setStateStep={this.setStateStep}
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          e={this.state.e}

          content_structure={this.state.content_structure}
          nested_data={this.state.nested_data}
          innerHandleChange={this.innerHandleChange}
          validateInputs={this.validateInputs}
        />
        break;
      case 6:
        component = <Part6
          step={step}
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

          abstract_name_type={this.state.abstract_name_type}
          abstract_points={this.state.abstract_points}
          content_structure={this.state.content_structure}


        />
        break;
      default:
        component = null
        break;
    }

    return component
  }


  render() {
    let component = this.componentStep(this.state.step)

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
    const textareas = document.getElementsByTagName('textarea');

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

    for (let i = 0; i < textareas.length; i++) {
      const textarea = textareas[i];
      if (textarea.required && !textarea.checkValidity()) {
        // Input is invalid, trigger validation error message
        textarea.reportValidity();
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



  innerHandleChange = (e, type2edit = undefined, id = undefined) => {
    console.log(e.target.name, type2edit, id)

    if(!type2edit || !id) return

    this.setState(prevState => {
      let updateNestedData = [...prevState.nested_data];

      let object = updateNestedData.find((object)=>{
        return object.type == type2edit && object.id == id
      })

      console.log({object})

      

      // Create new input object if no object available
      if(!object) {
        console.log('create..')
        object = {
          id: id,
          type: type2edit,
          [e.target.name]: e.target.value
        }
        updateNestedData = [...prevState.nested_data, object]
      // Edit input object if object available
      } else {
        console.log('already created..')
        let objIndex = updateNestedData.findIndex((obj => {
          return (obj.type == type2edit && obj.id == id)
        }));

        console.log('updateNestedData[objIndex]', updateNestedData[objIndex])
        updateNestedData[objIndex][e.target.name] = e.target.value
      }

      //
      // const links_will_be_present = [SECTION_TYPES.P]
      
      // if(links_will_be_present.includes(type2edit)){
      //   let a_blocks
      //   let objIndex = updateNestedData.findIndex((obj => obj.type == type2edit));

      //   a_blocks = updateNestedData[objIndex][e.target.name].match(/\[([^\[\]]+)\]/g)?.map(match => match.slice(1, -1));

      //   updateNestedData[objIndex].a_blocks = {...{content: a_blocks}}
      // }



      // updateNestedData[objIndex][e.target.name] = e.target.value



      return { nested_data: updateNestedData }
    });

    return
  }


}


const element = <CreateArticle />;

ReactDOM.render(element, document.getElementById('react-div'));

export default CreateArticle

