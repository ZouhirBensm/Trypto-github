
import { validateInputs, validateExpiry, validateEmpty, validateRegEx } from '../../../full-stack-libs/validations'
import './style/EditBaseOrderInformation.css'
import MARKET_CATEGORIES from '../../../full-stack-libs/Types/MarketCategories'

class EditBaseOrderInformation extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      popup: undefined,
      categories_options: [],
      subcategories_options: [],
      selectedCategory: this.props.category,
      selectedSubcategory: this.props.subcategory
    }

    this.setpopup = this.setpopup.bind(this)
    
    this.selectCategory = React.createRef();
    this.selectSubcategory = React.createRef();

    

    this.textareaTitle = React.createRef();
    this.textareaDescription = React.createRef();
    this.selectCondition = React.createRef();
    this.inputExpirydate = React.createRef();
    this.inputExpirytime = React.createRef();

  }

  handleCategoryChange = (event) => {
    for (const key in MARKET_CATEGORIES) {
      if (Object.hasOwnProperty.call(MARKET_CATEGORIES, key)) {
        const MARKET_CATEGORY = MARKET_CATEGORIES[key];
        if(event.target.value !== MARKET_CATEGORY.name) continue
        this.setState({ selectedCategory: event.target.value,  selectedSubcategory: "", subcategories_options: MARKET_CATEGORY.sub});
      }
    }
  }

  handleSubcategoryChange = (event) => {
    this.setState({ selectedSubcategory: event.target.value });
  }


  componentDidMount() {

    let categories_options = []

    for (const key in MARKET_CATEGORIES) {
      if (Object.hasOwnProperty.call(MARKET_CATEGORIES, key)) {
        const MARKET_CATEGORY = MARKET_CATEGORIES[key];
        categories_options.push(MARKET_CATEGORY.name)

        console.log(this.props.category, MARKET_CATEGORY.name)
        console.log(this.props.category === MARKET_CATEGORY.name)
        if (MARKET_CATEGORY.name == this.props.category) {
          console.log(MARKET_CATEGORY.sub)
          this.setState({subcategories_options: MARKET_CATEGORY.sub})
        }

      }
    }



    this.setState({ 
      categories_options: categories_options,
    })
    
    

    // this.selectCategory.current.value = this.props.category




    console.log("EditBaseOrderInformation just componentDidMount!")

    const h1 = document.querySelector('div#market-order-part1 > form#my_form > h1')
    console.log(h1.offsetWidth)
    const textareaElement = document.querySelector('div#market-order-part1 h1 > textarea#title-select')

    const containerWidth = h1.offsetWidth

    let mock_H1 = document.createElement("span");
    mock_H1.innerHTML = this.props.title

    mock_H1.style.fontFamily = `Montserrat, sans-serif`
    mock_H1.style.fontWeight = '700'
    mock_H1.style.fontSize = 'var(--font-size-h1)'
    mock_H1.style.whiteSpace = 'nowrap'


    h1.appendChild(mock_H1)

    console.log(containerWidth, mock_H1.offsetWidth)


    let rows_needed = Math.ceil(mock_H1.offsetWidth / containerWidth)
    console.log(rows_needed)
    let cols_needed = rows_needed == 1 ? this.props.title.length : undefined

    // rows_needed == 1 ? h1.style.width = 'fit-content' : null


    textareaElement.setAttribute('rows', rows_needed);

    if (cols_needed) {
      textareaElement.setAttribute('cols', (cols_needed + 5));
      textareaElement.style.width = 'fit-content';
      textareaElement.style.margin = 'unset';
      textareaElement.style.display = 'inline';
    }

    mock_H1.style.display = 'none'
  }

  componentWillUnmount() {
    console.log("EditBaseOrderInformation just componentWillUnmount!")

    const textareaElement = document.querySelector('div#market-order-part1 h1 > textarea#title-select')

    textareaElement.style.width = '100%'
    textareaElement.style.margin = '0 auto'
    textareaElement.style.display = 'block'

  }

  setpopup(error_message) {
    console.log(`Setting popup: ${error_message}`)
    this.setState({
      popup: error_message
    })
  }

  EditValidation(EditBaseOrderInformation_data, EditBaseOrderInformation_data2) {
    let error_msg_retrieved_if_any

    if (EditBaseOrderInformation_data.newtitle === this.props.title && EditBaseOrderInformation_data.newdescription === this.props.description && EditBaseOrderInformation_data.newcategory === this.props.category && EditBaseOrderInformation_data2.newsubcategory === this.props.subcategory && parseInt(EditBaseOrderInformation_data2.newcondition) === this.props.condition && EditBaseOrderInformation_data.expirydate === this.props.expirationDate && EditBaseOrderInformation_data.expirytime === this.props.expirationTime) {
      error_msg_retrieved_if_any = `Nothing has changed, therefor nothing to update!`
      this.setpopup(error_msg_retrieved_if_any)
      return false
    }

    error_msg_retrieved_if_any = validateRegEx(EditBaseOrderInformation_data2) || validateInputs(EditBaseOrderInformation_data) || validateExpiry(EditBaseOrderInformation_data)

    if (error_msg_retrieved_if_any) {
      this.setpopup(error_msg_retrieved_if_any)
      return false
    } else {
      this.setpopup(undefined)
      return true
    }
  }



  async EditFunction1(EditBaseOrderInformation_data, EditBaseOrderInformation_data2) {
    console.log("Making api call to edit this component!")

    console.log(EditBaseOrderInformation_data, EditBaseOrderInformation_data2)

    const response = await fetch(`/marketplace/${userId}/update1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        EditBaseOrderInformation_data,
        EditBaseOrderInformation_data2
      })
    })

    const json = await response.json()

    console.log(response)
    console.log(json)

    if (response.status === 200) {
      this.props.handleToogleEdit(undefined)
      this.props.loadData()
      return
    } else {
      const message = `Server Error | Please, try again later!`
      this.setpopup(json?.error?.message || message)
      return
    }

  }

  render() {

    const date = new Date(this.props.postedDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);


    return (
      <React.Fragment>

        {/* KEPT AS REFERENCE notsure might require to place class gray-box in a div.gray-box in order for the style .gray-box{} to apply accross browsers */}
        <form className="form gray-box" id="my_form"
        // KEPT AS REFERENCE notsure: configuration 2, kept, the onSubmit is linked to the inputs form='my_form' attribute. 
        // My worry is that of edit part will trigger this same function instead of their defined onSubmit (as the id='myform' are the same)
        // Temporarly kept configuration
        // If does not work long term switch to configuration 1 for all parts

        // onSubmit={async (e) => {

        //   e.preventDefault()
        //   let EditBaseOrderInformation_data = {
        //     orderID: this.props.orderID,
        //     newtitle: document.getElementById("my_form").elements["title"].value,
        //     newdescription: document.getElementById("my_form").elements["description"].value,
        //     newcategory: document.getElementById("my_form").elements["category"].value,
        //     newcondition: document.getElementById("my_form").elements["condition"].value,
        //     expirydate: document.getElementById("my_form").elements["expirydate"].value,
        //     expirytime: document.getElementById("my_form").elements["expirytime"].value,
        //   }

        //   let ret_EditValidation = this.EditValidation(EditBaseOrderInformation_data)
        //   if (ret_EditValidation) {
        //     let ret_EditFunction1 = await this.EditFunction1(EditBaseOrderInformation_data)
        //     return
        //   } else {
        //     return
        //   }
        // }}
        >



          {/* <label htmlFor="title-select">Title</label> */}
          <h1>
            {/* <input type="text" id="title-select" name="title" defaultValue={this.props.title} /> */}

            <textarea ref={this.textareaTitle} id="title-select" name="title" defaultValue={this.props.title}></textarea>

            <button onClick={(e) => {
              this.props.handleToogleEdit(undefined)
            }}>
              <img src="/img/SVG/market/individual-article/revert2.svg" alt="" />
            </button>
          </h1>



          {/* <label htmlFor="category-select">Category</label> */}
          <select ref={this.selectCategory} name="category" id="category-select" 
          // defaultValue={this.props.category}
          value={this.state.selectedCategory} // Use selectedCategory from state
          onChange={this.handleCategoryChange}
          >
            <option value="">No Selection</option>
            {this.state.categories_options.map((option, index) => {
              return <option key={index} value={option}>{option}</option>
            })}
          </select>


          <label htmlFor="subcategory-input">Subcategory</label>
          <select ref={this.selectSubcategory} className="drop-down-icon" name="subcategory" id="subcategory-input" 
          // defaultValue={this.props.subcategory}
          value={this.state.selectedSubcategory} // Use selectedSubcategory from state
          onChange={this.handleSubcategoryChange}
          >
            <option value="">No Selection</option>
            {this.state.subcategories_options.map((option, index) => {
              return <option key={index} value={option}>{option}</option>
            })}
          </select>


          <label htmlFor="description-select">Description</label>
          <textarea ref={this.textareaDescription} id="description-select" name="description" rows="3" defaultValue={this.props.description}></textarea>




          <label htmlFor="condition-input">Condition</label>
          <select ref={this.selectCondition} className="drop-down-icon" name="condition" id="condition-input" defaultValue={parseInt(this.props.condition)}>
            <option value="">No Selection</option>
            <option value={1}>Brand new</option>
            <option value={2}>Barely used</option>
            <option value={3}>In good condition</option>
            <option value={4}>Used</option>
          </select>



          <label htmlFor="expirydate-select">Expiry Date</label>
          <input ref={this.inputExpirydate} id="expirydate-select" type="date" name="expirydate" defaultValue={this.props.expirationDate} />

          <label htmlFor="expirytime-select">Expiry Time</label>
          <input ref={this.inputExpirytime} id="expirytime-select" type="time" name="expirytime" defaultValue={this.props.expirationTime} />



          {this.state.popup ?
            <span className="popup">{this.state.popup}</span>
            : null}


          {/* configuration 3 */}
          <button className='save-part' onClick={async (e) => {

            e.preventDefault()
            let EditBaseOrderInformation_data = {
              orderID: this.props.orderID,
              newtitle: this.textareaTitle.current.value,
              newdescription: this.textareaDescription.current.value,
              newcategory: this.selectCategory.current.value,
              expirydate: this.inputExpirydate.current.value,
              expirytime: this.inputExpirytime.current.value,
            }

            let EditBaseOrderInformation_data2 = {
              newsubcategory: this.selectSubcategory.current.value,
              newcondition: this.selectCondition.current.value,
            }

            let ret_EditValidation = this.EditValidation(EditBaseOrderInformation_data, EditBaseOrderInformation_data2)
            
            if (ret_EditValidation) {
              let ret_EditFunction1 = await this.EditFunction1(EditBaseOrderInformation_data, EditBaseOrderInformation_data2)
              return
            } else {
              return
            }
          }}>Save</button>






        </form>


        <h2>Posted Date</h2>
        <div>{formattedDate}</div>


        {/* KEPT AS REFERENCE configuration 1 get rid of the form="my_form" and enable the onClick event on this input tag */}
        {/* <input type="submit" value="Save Edits" form="my_form"

        onClick={async (e) => {

          e.preventDefault()
          let EditBaseOrderInformation_data = {
            orderID: this.props.orderID,
            newtitle: document.getElementById("my_form").elements["title"].value,
            newdescription: document.getElementById("my_form").elements["description"].value,
            newcategory: document.getElementById("my_form").elements["category"].value,
            newcondition: document.getElementById("my_form").elements["condition"].value,
            expirydate: document.getElementById("my_form").elements["expirydate"].value,
            expirytime: document.getElementById("my_form").elements["expirytime"].value,
          }

          let ret_EditValidation = this.EditValidation(EditBaseOrderInformation_data)
          if (ret_EditValidation) {
            let ret_EditFunction1 = await this.EditFunction1(EditBaseOrderInformation_data)
            return
          } else {
            return
          }
        }} 

        /> */}





      </React.Fragment>
    )
  }
}

export default EditBaseOrderInformation