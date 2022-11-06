
import '../style/reactDivMobile.css'

// import MakeMarketOrder from './CopyMakeMarketOrder'


class _1_InputGeneralMarketOrder extends React.Component {


  render() {

    return (
      <React.Fragment>
        <div className="make-container">
          <form className="form" id="form_id">

            <label htmlFor="title-select">Title</label>
            <input type="text" id="title-select" name="title" required  value={this.props.title} onChange={(e) => this.props.handleChange("title", e)}/><br />

            <label htmlFor="description-select">Description</label>
            <textarea name="description" id="description-select" cols="30" rows="3" required value={this.props.description} onChange={(e) => this.props.handleChange("description", e)}></textarea><br />

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
            <input id="expirydate-select" type="date" name="expirydate" required value={this.props.expirydate} onChange={(e) => this.props.handleChange("expirydate", e)}/><br />

            <label htmlFor="expirytime-select">Order Expiry Time</label>
            <input id="expirytime-select" type="time" name="expirytime" required value={this.props.expirytime} onChange={(e) => this.props.handleChange("expirytime", e)}/><br />

          </form><br />
        </div>


        <button onClick={(e) => {
          this.props.nextStep(e)
        }}>Next</button>

      </React.Fragment>
    )
  }
}

export default _1_InputGeneralMarketOrder
