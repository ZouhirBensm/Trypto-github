import '../style/reactDivMobile.css'
import './styles/CreateArticle.css'
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
const _6_ArticleSEOedSubmit = loadable(() => import("../operations-components/create-article-parts/_6_ArticleSEOedSubmit"), {
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
      // canonical: undefined,
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
      // abstract_name_type: "",
      // abstract_points: [],
      // content_structure: undefined


      // // _____________________________________________________


      // TEMPORAL
      // USED TO TEST CREATE QUICKLY
      step: 1,
      html_title: "Some random title", // CHECK (ArticleHeadTag)
      meta_title: "Some random title2",
      meta_description: "Some random description", // CHECK (ArticleHeadTag)
      canonical: undefined, // CHECK (ArticleHeadTag)
      noindex: false, // CHECK (ArticleHeadTag)
      nofollow: false, // CHECK (ArticleHeadTag)
      keywords: ['opti for this', 'and for that'], // CHECK (ArticleBodyHeader)
      // category: "bitcoin", // CHECK (ArticleBodyHeader)
      category: "bitcoin", // CHECK (ArticleBodyHeader)
      banner_img_alt: "some alt txt for the image", // CHECK (ArticleBodyHeader)
      h1: "The H1 title", // CHECK (ArticleBodyHeader)


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
      content_structure: [SECTION_TYPES.H2, SECTION_TYPES.H3, SECTION_TYPES.SUMMERNOTE, SECTION_TYPES.IMG, SECTION_TYPES.A, SECTION_TYPES.EMBED, SECTION_TYPES.IMG],
      // content_structure: [SECTION_TYPES.A],
      e: undefined,
      // nested_data: []
      nested_data: [
        {
          "id": 1,
          "type": "H2",
          "H2_innerHTML": "H2 title"
        },
        {
          "id": 2,
          "type": "H3",
          "H3_innerHTML": "H3 title"
        },
        {
          "id": 3,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>some paragraph</p>"
        },
        {
          "id": 4,
          "type": "IMG",
          "img_width": "500",
          "img_height": "500",
          "img_alt": "some alt text",
          "img_description": "some description"
        },
        {
          "id": 5,
          "type": "A",
          "A_href": "google.com",
          "A_title": "Google",
          "newtab": true,
          "nofollow": true,
          "ugc": true,
          "noopener": true,
          "image_mode_on": true,
          "img_width": "500",
          "img_height": "600",
          "img_alt": "some text",
          "img_description": "some description"
        },
        {
          "id": 6,
          "type": "EMBED",
          "embed_width": "500",
          "embed_height": "300",
          "embed_type": "/some/type/video",
          "embed_source": "https://www.youtube.com/watch?v=1-q_8TKNG9w",
          "embed_title": "BBC earth"
        },
        {
          "id": 7,
          "type": "IMG",
          "img_width": "400",
          "img_height": "400",
          "img_alt": "lala lala",
          "img_description": "bla bla"
        },
      ]




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
      // [e.target.name]: !this.state[e.target.name]
      [e.target.name]: e.target.checked
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
          innerHandleChangeToogleDeleteFields={this.innerHandleChangeToogleDeleteFields}
          validateInputs={this.validateInputs}
        // innerIMGOnChange={this.innerIMGOnChange}
        />
        break;
      case 6:
        component = <_6_ArticleSEOedSubmit
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

          abstract_name_type={this.state.abstract_name_type}
          abstract_points={this.state.abstract_points}
          content_structure={this.state.content_structure}
          nested_data={this.state.nested_data}


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



  innerHandleChangeToogleDeleteFields = (e, type2edit = undefined, id = undefined, toogle_state, fields_todelete) => {
 
    var eventTargetName = e.target.name
    console.log(e.target.type, type2edit, id, eventTargetName, toogle_state)

    // if (eventTargetName != 'image_mode_on') return

    if (!type2edit || !id) return

    this.setState(prevState => {
      let updateNestedData = [...prevState.nested_data];

      let object = updateNestedData.find((object) => {
        return object.type == type2edit && object.id == id
      })

      console.log({ object })



      // Create new input object if no object available
      if (object) {
        // console.log('already created..')
        let objIndex = updateNestedData.findIndex((obj => {
          return (obj.type == type2edit && obj.id == id)
        }));

        // console.log('updateNestedData[objIndex]', updateNestedData[objIndex])
        fields_todelete.forEach(field => {
          delete updateNestedData[objIndex][field]
        });
      }

      return { nested_data: updateNestedData }
    });

    return
  }



  innerHandleChange = (e, type2edit = undefined, id = undefined) => {

    var eventTargetName = e.target.name
    console.log("e.target.type, type2edit, id, eventTargetName")
    console.log(e.target.type, type2edit, id, eventTargetName)

    let value
    switch (e.target.type) {
      case "text":
        value = e.target.value
        break;
      case "checkbox":
        value = e.target.checked
        break;
      case "file":
        const image_file = e.currentTarget.files[0]
        const image_name = e.currentTarget.files[0].name
        value = {
          image_file: image_file,
          image_name: image_name
        }
        break;
      default:
        value = e.target.value
        break;
    }


    if (!type2edit || !id) return

    this.setState(prevState => {
      let updateNestedData = [...prevState.nested_data];

      let object = updateNestedData.find((object) => {
        return object.type == type2edit && object.id == id
      })

      // console.log({ object })



      // Create new input object if no object available
      if (!object) {
        console.log('create..')
        object = {
          id: id,
          // e.target.type
          type: type2edit,
          [eventTargetName]: value
        }
        updateNestedData = [...prevState.nested_data, object]
        // Edit input object if object available
      } else {
        console.log('already created..')
        let objIndex = updateNestedData.findIndex((obj => {
          return (obj.type == type2edit && obj.id == id)
        }));

        if (value == "") {
          delete updateNestedData[objIndex][eventTargetName]
          return { nested_data: updateNestedData }
        }

        // console.log('updateNestedData[objIndex]', updateNestedData[objIndex])
        updateNestedData[objIndex][eventTargetName] = value


      }

      return { nested_data: updateNestedData }
    });

    return

  }









}


const element = <CreateArticle />;

ReactDOM.render(element, document.getElementById('react-div'));

export default CreateArticle

