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
      // step: 1,
      // STEP 1
      html_title: "",
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
      content_structure: [SECTION_TYPES.H2]


      // // _____________________________________________________


      // TEMPORAL
      // USED TO TEST CREATE QUICKLY

      // step: 1,
      // html_title: "Some random title", // CHECK (ArticleHeadTag)
      // meta_title: "Some random title2",
      // meta_description: "Some random description", // CHECK (ArticleHeadTag)
      // canonical: undefined, // CHECK (ArticleHeadTag)
      // noindex: true, // CHECK (ArticleHeadTag)
      // nofollow: false, // CHECK (ArticleHeadTag)
      // keywords: ['opti for this', 'and for that'], // CHECK (ArticleBodyHeader)
      // // category: "bitcoin", // CHECK (ArticleBodyHeader)
      // category: "bitcoin", // CHECK (ArticleBodyHeader)
      // banner_img_alt: "some alt txt for the image", // CHECK (ArticleBodyHeader)
      // h1: "The H1 title", // CHECK (ArticleBodyHeader)


      // // banner_image_path
      // banner_image_file: undefined, // CHECK (ArticleEnclosureImage)
      // banner_image_name: undefined, // NO NEED TO SAVE

      // abstract_name_type: "Resume",
      // abstract_points: [
      //   "Lorem, ipsum",
      //   "dolor <strong>sit amet consectetur</strong> adipisicing",
      //   "elit. <strong>Eum</strong> aspernatur<strong> cupiditate</strong>",
      //   "<strong>atque</strong> culpa deleniti cum nesciunt eveniet"
      // ],




      // content_structure: [SECTION_TYPES.H2, SECTION_TYPES.SUMMERNOTE, SECTION_TYPES.EMAIL, SECTION_TYPES.H3, SECTION_TYPES.IFRAME, SECTION_TYPES.IMG, SECTION_TYPES.IMG, SECTION_TYPES.A, SECTION_TYPES.EMAIL, SECTION_TYPES.A],
      // // content_structure: [SECTION_TYPES.IMG, SECTION_TYPES.IMG],
      // // content_structure: [SECTION_TYPES.A, SECTION_TYPES.A],
      // // content_structure: [SECTION_TYPES.IFRAME],
      // e: undefined,
      // // nested_data: [],
      // nested_data: [
      //   {
      //     "id": 1,
      //     "type": "H2",
      //     "H2_innerHTML": "Some h2 title"
      //   },
      //   {
      //     "id": 2,
      //     "type": "SUMMERNOTE",
      //     "SUMMERNOTE_innerHTML": "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit magni necessitatibus quos illum qui alias blanditiis, impedit facilis vero, provident nesciunt modi ad obcaecati libero vel quidem veritatis ipsa sunt!</p><p>I hope this works!</p><p>I hope this works!</p><p>adding&nbsp;a link&nbsp;to <a href=\"https://google.com\" target=\"_blank\">google</a>. bla.</p><ul><li>one</li><li>two bla bla&nbsp;<a href=\"https://yahoo..com\" target=\"_blank\">yahoo</a> ici. bla.</li><li>this is amazing!</li></ul>"
      //   },
      //   {
      //     "id": 3,
      //     "type": "EMAIL",
      //     "EMAIL_title": "title1",
      //     "EMAIL_subtitle": "subtitle1"
      //   },
      //   {
      //     "id": 4,
      //     "type": "H3",
      //     "H3_innerHTML": "some h3 element"
      //   },
      //   {
      //     "id": 5,
      //     "type": "IFRAME",
      //     "iframe_name": "Some name",
      //     "iframe_description": "Some description",
      //     "iframe_source": "https://www.youtube.com/embed/s2LmubDQ4RI"
      //   },
      //   {
      //     "id": 6,
      //     "type": "IMG",
      //     "img_width": "200",
      //     "img_height": "200",
      //     "img_alt": "Algerians",
      //     "img_description": "Phenotype of algerians",
      //   },
      //   {
      //     "id": 7,
      //     "type": "IMG",
      //     "img_src": "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2023/revuelto/revuelto_m.png",
      //     "img_alt": "Lambo",
      //     "img_width": "300",
      //     "img_height": "200",
      //     "img_description": "a Lambo"
      //   },
      //   {
      //     "id": 8,
      //     "type": "A",
      //     "A_href": "https://en.wikipedia.org/wiki/Cars_(film)",
      //     "A_innerText": "Wiki cars",
      //     "A_title": "a title",
      //     "newtab": true,
      //     "ugc": true,
      //     "nofollow": true,
      //     "noopener": true
      //   },
      //   {
      //     "id": 9,
      //     "type": "EMAIL",
      //     "EMAIL_title": "title2",
      //     "EMAIL_subtitle": "subtitle2"
      //   },
      //   {
      //     "id": 10,
      //     "type": "A",
      //     "A_href": "https://www.bbc.com/news/world-europe-66104632",
      //     "A_title": "BBC franch",
      //     "newtab": true,
      //     "image_mode_on": true,
      //     "img_width": "350",
      //     "img_height": "100",
      //     "img_src": "https://ichef.bbci.co.uk/news/976/cpsprodpb/14044/production/_130288918_amin.png.webp",
      //     "img_alt": "some ugly fuck",
      //     "img_description": "some ugly fuck"
      //   }
      // ]


      // // nested_data: [
      // //   {
      // //     "id": 1,
      // //     "type": "A",
      // //     "A_href": "google.com",
      // //     "A_title": "Some A title",
      // //     "newtab": true,
      // //     "nofollow": true,
      // //     "ugc": true,
      // //     "A_innerText": "The inner A Google website"
      // //   },
      // //   {
      // //     "id": 2,
      // //     "type": "A",
      // //     "A_href": "yahoo.com",
      // //     "A_title": "Some A title 2",
      // //     "image_mode_on": true,
      // //     "img_width": "200",
      // //     "img_height": "200",
      // //     "img_alt": "a ai generated image",
      // //     "img_description": "the schema"
      // //   }
      // // ],

      // // nested_data: [
      // //   {
      // //     "id": 1,
      // //     "type": "IMG",
      // //     "img_width": "300",
      // //     "img_height": "300",
      // //     "img_alt": "some alt text",
      // //     "img_description": "some description"
      // //   },
      // //   {
      // //     "id": 2,
      // //     "type": "IMG",
      // //     "img_width": "100",
      // //     "img_height": "100",
      // //     "img_src": "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2023/revuelto/revuelto_m.png",
      // //     "img_alt": "lambo",
      // //     "img_description": "lambo"
      // //   }
      // // ]

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


      const updated_nested_data = [...prevState.nested_data]
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

      const updated_nested_data = [...prevState.nested_data]

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



// TODO !!!! 
// Need to Test the schemas from production
// Case sensivety on login
// Footer link build
// Publish and archive market orders
// Textarea resize stop