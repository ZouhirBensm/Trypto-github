import '../style/_1_InputGeneralMarketOrder.css'

import { validateInputs, validateExpiry } from '../../../full-stack-libs/validations'
import MARKET_CATEGORIES from '../../../full-stack-libs/Types/MarketCategories'



class _1_InputGeneralMarketOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories_options: [],
      selectedCategory: this.props.category
    }

    this.inputTitle = React.createRef();
    this.textAreaDescription = React.createRef();
    this.selectCategory = React.createRef();
    this.selectSubcategory = React.createRef();
    this.selectCondition = React.createRef();
    this.inputExpiryDate = React.createRef();
    this.inputExpiryTime = React.createRef();
  }

  handleCategoryChange = (event) => {
    this.setState({ selectedCategory: event.target.value });
  }

  componentDidMount() {

    let categories_options = []

    for (const key in MARKET_CATEGORIES) {
      if (Object.hasOwnProperty.call(MARKET_CATEGORIES, key)) {
        const MARKET_CATEGORY = MARKET_CATEGORIES[key];
        categories_options.push(MARKET_CATEGORY.name)
      }
    }

    this.setState({ categories_options: categories_options })


  }

  setOptions(_category) {
    let options = []



    for (const key in MARKET_CATEGORIES) {
      if (Object.hasOwnProperty.call(MARKET_CATEGORIES, key)) {
        const MARKET_CATEGORY = MARKET_CATEGORIES[key];
        if (MARKET_CATEGORY.name !== _category) continue

        options = MARKET_CATEGORY.sub.map((el, i) => <option key={i} value={el}>{el}</option>);
        
      }
    }

    return options
  }


  async validation() {
    let _1_InputGeneralMarketOrder_data = {
      title: this.inputTitle.current.value,
      description: this.textAreaDescription.current.value,
      category: this.selectCategory.current.value,
      subcategory: this.selectSubcategory.current.value,
      condition: this.selectCondition.current.value,
      expirydate: this.inputExpiryDate.current.value,
      expirytime: this.inputExpiryTime.current.value,
    }

    console.log(_1_InputGeneralMarketOrder_data)

    let error_msg_retrieved_if_any

    error_msg_retrieved_if_any = validateInputs(_1_InputGeneralMarketOrder_data) || validateExpiry(_1_InputGeneralMarketOrder_data)

    console.log("error======>>>>>>> ", error_msg_retrieved_if_any)


    if (error_msg_retrieved_if_any) {
      this.props.setpopup(error_msg_retrieved_if_any)
      return false
    } else { return true }
  }


  render() {
    // let options = []
    let options = this.setOptions(this.state.selectedCategory)

    return (
      <React.Fragment>
        <div className="make-container">
          <form className="form" id="form_id">

            <label htmlFor="title-select">Title</label>
            <input ref={this.inputTitle} type="text" id="title-select" name="title" required value={this.props.title || ''} onChange={(e) => this.props.handleChange("title", e)} placeholder='Article title' />

            <label htmlFor="description-select">Description</label>
            <textarea ref={this.textAreaDescription} name="description" id="description-select" rows="3" required value={this.props.description || ''} onChange={(e) => this.props.handleChange("description", e)} placeholder='Article details'></textarea >

            <label className='picker-label' htmlFor="category-select">Category</label>
            <select ref={this.selectCategory} className='picker' name="category" id="category-select" required 
            onChange={(e) => {
              this.props.handleChange("category", e); 
              this.handleCategoryChange(e);
            }}
            value={this.state.selectedCategory}
            >
              <option value="">No Selection</option>
              {this.state.categories_options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select><br />

            <label className='picker-label' htmlFor="subcategory-select">Subcategory</label>
            <select ref={this.selectSubcategory} className='picker' name="subcategory" id="subcategory-select" required value={this.props.subcategory} onChange={(e) => this.props.handleChange("subcategory", e)}>
              <option value="">No Selection</option>
              {options}
            </select><br />


            <label className='picker-label' htmlFor="condition-input">Condition</label>
            <select ref={this.selectCondition} className='picker' name="condition" id="condition-input" required value={this.props.condition} onChange={(e) => this.props.handleChange("condition", e)}>
              <option value="">No Selection</option>
              <option value={1}>Brand new</option>
              <option value={2}>Just opened</option>
              <option value={3}>In good condition</option>
              <option value={4}>Used</option>
            </select>


            <label htmlFor="expirydate-select">Order Expiry Date</label>
            <input ref={this.expirydate} id="expirydate-select" type="date" name="expirydate" required value={this.props.expirydate || ''} onChange={(e) => this.props.handleChange("expirydate", e)} />

            <label htmlFor="expirytime-select">Order Expiry Time</label>
            <input ref={this.expirytime} id="expirytime-select" type="time" name="expirytime" required value={this.props.expirytime || ''} onChange={(e) => this.props.handleChange("expirytime", e)} />

          </form>
        </div>


        <div id='proceed'>
          <button onClick={async (e) => {
            let ret_validation = await this.validation()
            if (ret_validation) {
              return this.props.nextStep(e)
            } else {
              return
            }
          }}>Proceed</button>
          <img src="/img/SVG/sub/proceed.svg" alt=""></img>
        </div>

      </React.Fragment>
    )
  }
}

export default _1_InputGeneralMarketOrder