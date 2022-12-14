import {validateInputs, validateExpiry} from '../../../full-stack-libs/validations'


class _1_InputGeneralMarketOrder extends React.Component {
  constructor(props){
    super(props)
    this.state = {}

  }

  async validation(){
    let _1_InputGeneralMarketOrder_data = {
      title: document.getElementById("form_id").elements["title"].value,
      description: document.getElementById("form_id").elements["description"].value,
      category: document.getElementById("form_id").elements["category"].value,
      condition: document.getElementById("form_id").elements["condition"].value,
      expirydate: document.getElementById("form_id").elements["expirydate"].value,
      expirytime: document.getElementById("form_id").elements["expirytime"].value,
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

    return (
      <React.Fragment>
        <div className="make-container">
          <form className="form" id="form_id">

            <label htmlFor="title-select">Title</label>
            <input type="text" id="title-select" name="title" required value={this.props.title || ''} onChange={(e) => this.props.handleChange("title", e)}/><br />

            <label htmlFor="description-select">Description</label>
            <textarea name="description" id="description-select" cols="30" rows="3" required value={this.props.description || ''} onChange={(e) => this.props.handleChange("description", e)}></textarea><br />

            <label htmlFor="category-select">Category</label>
            <select name="category" id="category-select" required value={this.props.category} onChange={(e) => this.props.handleChange("category", e)}>
            <option value="">No Selection</option>
              <option value="Other">Other</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Clothes">Clothes</option>
              <option value="Electronics">Electronics</option>
              <option value="Automobile">Automobile</option>
              <option value="Camping">Camping</option>
              <option value="Furniture">Furniture</option>
            </select><br />


            <label htmlFor="condition-input">Condition</label>
            <select name="condition" id="condition-input" required value={this.props.condition} onChange={(e) => this.props.handleChange("condition", e)}>
              <option value="">No Selection</option>
              <option value={1}>Brand new</option>
              <option value={2}>Just opened</option>
              <option value={3}>In good condition</option>
              <option value={4}>Used</option>
            </select><br />


            <label htmlFor="expirydate-select">Order Expiry Date</label>
            <input id="expirydate-select" type="date" name="expirydate" required value={this.props.expirydate || ''} onChange={(e) => this.props.handleChange("expirydate", e)}/><br />

            <label htmlFor="expirytime-select">Order Expiry Time</label>
            <input id="expirytime-select" type="time" name="expirytime" required value={this.props.expirytime || ''} onChange={(e) => this.props.handleChange("expirytime", e)}/><br />

          </form><br />
        </div>


        <button onClick={async (e) => {
          let ret_validation = await this.validation()
          if (ret_validation) {
            return this.props.nextStep(e)
          } else {
            return
          }
        }}>Next</button>

      </React.Fragment>
    )
  }
}

export default _1_InputGeneralMarketOrder