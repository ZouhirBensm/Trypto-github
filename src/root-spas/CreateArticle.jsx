import '../style/reactDivMobile.css'
import './styles/CreateArticle.css'
import SECTION_TYPES from '../../full-stack-libs/Types/ArticleSectionTypes'
import { isObjEmpty } from '../../full-stack-libs/utils'

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
      create_true_edit_false: true, // DEFAULT SET TO CREATE
      step: 1,
      // STEP 1
      html_title: "",
      changefreq: "",
      meta_title: "",
      meta_description: "",
      canonical: undefined,
      noindex: false,
      nofollow: false,
      // STEP 2
      keywords: [],
      category: "",
      // publisher name, email, and link are default values for now
      banner_image_name: undefined,
      banner_image_file: undefined,
      // banner_image_path
      banner_img_alt: "",
      h1: "",
      // author is logged in username
      // published_datetime is default now upon creation
      abstract_name_type: "",
      abstract_points: [],
      content_structure: [SECTION_TYPES.H2],
      nested_data: [],
      e: undefined,


    }

    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.setStateStep = this.setStateStep.bind(this)

    this.handleChange = this.handleChange.bind(this)
    // this.handleChange2 = this.handleChange2.bind(this)
    this.setStateBannerImage = this.setStateBannerImage.bind(this)
    this.handleCheck = this.handleCheck.bind(this)

    this.asyncMaster = this.asyncMaster.bind(this)


  }

  promise1 = (image) => {
    const { name, path } = image;

    console.log(name, path)

    return new Promise((resolve, reject) => {

      fetch(path)

        .then(response => {
          if (response.ok) {
            return response.blob();
          } else {
            reject(new Error('Request failed'));
          }
        })

        .then(blob => {
          const file = new File([blob], name, { type: blob.type });

          console.log('Loaded image file:', file);
          resolve(file)
        })


        .catch(error => {
          reject(error);
        });

    });



  }



  asyncMaster = async (allImagesURLs) => {

    const promiseFunctions = allImagesURLs.map((url) => this.promise1(url));

    Promise.all(promiseFunctions).then((files) => {


      const [banner_image_file, ...block_files] = files
      console.log(block_files);

      console.log(pre_load_article_4_edit.articlenesteddata_id.blocks)


      // STEP 1: POPULATE IMAGE URLS
      for (let i = 0; i < pre_load_article_4_edit.articlenesteddata_id.blocks.length; i++) {

        console.log(pre_load_article_4_edit.articlenesteddata_id.blocks[i].type, !(pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.IMG || pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.A))

        // IF BLOCK not IMG  nor A SKIP
        if (!(pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.IMG || pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.A)) {
          continue
        }





        // IF BLOCK IMG, or A, and does not have a image field SKIP
        if (!pre_load_article_4_edit.articlenesteddata_id.blocks[i].image) {
          continue
        }

        console.log('hit!')
        // IF BLOCK IMG, or A, and has a image field then ...
        pre_load_article_4_edit.articlenesteddata_id.blocks[i].image.image_file = block_files.shift()

      }

      console.log('final: ', pre_load_article_4_edit.articlenesteddata_id.blocks)


      // Place the files
      // set state


      this.setState({
        step: 1,
        // STEP 1
        html_title: pre_load_article_4_edit.html_title,
        meta_title: pre_load_article_4_edit.articleheadtag_id.meta_title,
        changefreq: pre_load_article_4_edit.changefreq,
        meta_description: pre_load_article_4_edit.articleheadtag_id.meta_description,
        canonical: pre_load_article_4_edit.articleheadtag_id.canonical,
        noindex: pre_load_article_4_edit.articleheadtag_id.noindex,
        nofollow: pre_load_article_4_edit.articleheadtag_id.nofollow,
        // STEP 2
        keywords: pre_load_article_4_edit.articlebodyheader_id.keywords,
        category: pre_load_article_4_edit.articlebodyheader_id.category,
        // publisher name, email, and link are default values for now
        banner_image_name: pre_load_article_4_edit.articleenclosureimage_id.banner_image_originalname,
        banner_image_file: banner_image_file,
        // banner_image_path
        banner_img_alt: pre_load_article_4_edit.articleenclosureimage_id.banner_img_alt,
        h1: pre_load_article_4_edit.h1,
        // author is logged in username
        // published_datetime is default now upon creation
        abstract_name_type: pre_load_article_4_edit.articleabstract_id.abstract_name_type,
        abstract_points: pre_load_article_4_edit.articleabstract_id.abstract_points,
        content_structure: pre_load_article_4_edit.articlenesteddata_id.content_structure,
        nested_data: pre_load_article_4_edit.articlenesteddata_id.blocks
      });

    });

  }


  componentDidMount() {
    console.log('componentDidMount: ', pre_load_article_4_edit, allImagesURLs);

    if (isObjEmpty(pre_load_article_4_edit)) {
      console.log('nothing to load');
      return;
    }
    
    this.setState({create_true_edit_false: false}) // SET TO EDIT

    // BANNER IMAGE
    console.log(pre_load_article_4_edit.articleenclosureimage_id?.path);


    this.asyncMaster(allImagesURLs)

  }



  componentDidUpdate() {

    console.log("\n\nCreateArticle: componentDidUpdate: this.state.nested_data\n\n", this.state.nested_data)

  }


  handleChange = (e, input_name_val_object = undefined) => {
    // console.log(input_name_val_object, e)

    // const undefined_fields = ['canonical']
    const should_be_set_as_array_state_elements = ['keywords', "abstract_points", "content_structure"]
    const parse_bidblock_to_strong_tag = ["abstract_points"]

    // console.log("\n\ne.target.name: ", e.target?.name)

    // console.log("\n\ne.target.value: ", e.target?.value)

    let stateValue = e.target?.value

    if (parse_bidblock_to_strong_tag.includes(e.target?.name)) {
      // console.log('parsing...')
      stateValue = e.target?.value.replace(/\[/g, '<strong>').replace(/\]/g, '</strong>');
      // stateValue = JSON.stringify(stateValue);
    }

    if (should_be_set_as_array_state_elements.includes(e.target?.name)) {
      stateValue = stateValue.split(',  ')
    }
    // console.log(stateValue)

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

    // console.log("\n\ne.target.name: ", e.target.name)
    // console.log("\n\ne.target.checked: ", e.target.checked)

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
          changefreq={this.state.changefreq}
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
          addSelect={this.addSelect}
          deleteSelect={this.deleteSelect}
          handleChangeInputs={this.handleChangeInputs}
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
          changefreq={this.state.changefreq}
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

          create_true_edit_false={this.state.create_true_edit_false} 
          articleID_to_preload_4_edit={pre_load_article_4_edit._id}
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
    let inputs = document.getElementsByTagName('input');
    const selects = document.getElementsByTagName('select');
    const textareas = document.getElementsByTagName('textarea');

    inputs = [...inputs]

    let isValid = true;

    // Find the input elements with the desired IDs
    var inputBannerImgIdInput = inputs.find(function (input) {
      return input.id === 'input-img-id-or-validation';
    });

    var imageSrcInput = inputs.find(function (input) {
      return input.id === 'image-src';
    });

    // Check if both inputs are present
    if (inputBannerImgIdInput && imageSrcInput) {
      // console.log("Both input IDs are present in the array.");
      // Perform additional actions with the inputs if needed

      // Check if both required inputs are missing
      if (!inputBannerImgIdInput.checkValidity() && !imageSrcInput.checkValidity()) {
        !imageSrcInput.checkValidity() ? imageSrcInput.reportValidity() : null
        !inputBannerImgIdInput.checkValidity() ? inputBannerImgIdInput.reportValidity() : null
        isValid = false;
      }


    }

    // console.log('isValid', isValid)
    if (!isValid) {
      return isValid
    }




    inputs = inputs.filter(function (input) {
      return !['input-img-id-or-validation', 'image-src'].includes(input.id);
    });

    // console.log(inputs)
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];


      if (input.required && !input.checkValidity()) {

        // console.log('\n\ninput.id--->', input.id)

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

    // console.log(isValid)
    return isValid

  }



  innerHandleChangeToogleDeleteFields = (e, type2edit = undefined, id = undefined, toogle_state, fields_todelete) => {

    var eventTargetName = e.target.name
    // console.log(e.target.type, type2edit, id, eventTargetName, toogle_state)

    // if (eventTargetName != 'image_mode_on') return

    if (!type2edit || !id) return

    this.setState(prevState => {
      let updateNestedData = [...prevState.nested_data];

      let object = updateNestedData.find((object) => {
        return object.type == type2edit && object.id == id
      })

      // console.log({ object })



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

  resetInnerHandleChange= (e, type2edit = undefined, id = undefined, resetWhatAndToArrObj = []) => {

    if (!type2edit || !id) return

    
  }



  innerHandleChange = (e, type2edit = undefined, id = undefined) => {

    var eventTargetName = e.target.name
    console.log("\n\n__________\n\ne.target.type, type2edit, id, eventTargetName\n")
    console.log(e.target.type, type2edit, id, eventTargetName, '\n\n')

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
        // console.log('create..')
        object = {
          id: id,
          // e.target.type
          type: type2edit,
          [eventTargetName]: value
        }
        updateNestedData = [...prevState.nested_data, object]
        // Edit input object if object available
      } else {

        // console.log('already created..')
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





  addSelect = () => {
    this.setState(prevState => {
      // const updated_content_structure = [...prevState.content_structure];
      return { content_structure: [...prevState.content_structure, ''] }
    });
  };

  deleteSelect = (index, block_type) => (e) => {

    this.setState(prevState => {
      const updated_content_structure = [...prevState.content_structure];


      updated_content_structure.splice(index, 1); // Remove the input at the specified index


      const updated_nested_data = [...prevState.nested_data];
      const block = updated_nested_data[index]


      // TODO !!! Also try to reduce this component
      // console.log({ block_type })
      // console.log('block?.type ', block?.type)
      // console.log('block?.type === block_type ', block?.type === block_type)

      if (block?.type === block_type) {
        updated_nested_data?.splice(index, 1)
        for (let i = index; i < updated_nested_data.length; i++) {
          updated_nested_data[i].id = i + 1;
        }
      }

      return {
        content_structure: updated_content_structure,
        nested_data: updated_nested_data
      };
    });
  };

  handleChangeInputs = (index) => (event) => {

    // console.log('handleChangeInputs: ', index)
    const { value } = event.target;

    this.setState(prevState => {




      const updated_content_structure = [...prevState.content_structure];
      updated_content_structure[index] = value;

      const updated_nested_data = [...prevState.nested_data];

      if (!updated_nested_data[index]?.id && !updated_nested_data[index]?.type) {
        return {
          content_structure: updated_content_structure,
        };
      }


      const { id, type } = updated_nested_data[index];

      // Remove all properties except id
      for (let key in updated_nested_data[index]) {
        if (key !== 'id') {
          delete updated_nested_data[index][key];
        }
      }

      // Modify the type property
      updated_nested_data[index].type = value;


      return {
        content_structure: updated_content_structure,
        nested_data: updated_nested_data
      };
    });
  };






}


const element = <CreateArticle />;

ReactDOM.render(element, document.getElementById('react-div'));

export default CreateArticle



// TODO !!!
// Case sensivety on login
// Footer link build
// Publish and archive market orders
// Textarea resize stop the capability to drag