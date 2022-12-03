
import { validateInputs, validateExpiry } from '../../../full-stack-libs/validations'

class EditBaseOrderInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined
    }
    this.setpopup = this.setpopup.bind(this)
  }

  setpopup(error_message) {
    console.log(`Setting popup: ${error_message}`)
  }

  EditValidation(EditBaseOrderInformation_data) {
    let error_msg_retrieved_if_any

    if (EditBaseOrderInformation_data.newtitle === this.props.title && EditBaseOrderInformation_data.newdescription === this.props.description && EditBaseOrderInformation_data.newcategory === this.props.category && parseInt(EditBaseOrderInformation_data.newcondition) === this.props.condition &&  EditBaseOrderInformation_data.expirydate === this.props.expirationDate && EditBaseOrderInformation_data.expirytime === this.props.expirationTime) {

      error_msg_retrieved_if_any = `Nothing has changed, therefor nothing to update!`
      this.setpopup(error_msg_retrieved_if_any)
      return false
    }

    error_msg_retrieved_if_any = validateInputs(EditBaseOrderInformation_data) || validateExpiry(EditBaseOrderInformation_data)

    if (error_msg_retrieved_if_any) {
      this.setpopup(error_msg_retrieved_if_any)
      return false
    }
    else { return true }
  }

  async EditFunction1(EditBaseOrderInformation_data) {
    console.log("Making api call to edit this component!")


    const response = await fetch(`/marketplace/${userId}/update1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        EditBaseOrderInformation_data
      })
    })

    const json = await response.json()

    console.log(response)
    console.log(json)

    if (response.status === 200) {
      this.props.handleToogleEdit(undefined)
      this.props.loadData()
    } else {
    }

  }

  render() {
    console.log("ZZZZZZ----->>>>", this.props.orderID)
    return (
      <React.Fragment>

        <form className="form" id="my_form">
          <label htmlFor="title-select">Title</label>
          <input type="text" id="title-select" name="title" defaultValue={this.props.title} /><br />

          <label htmlFor="description-select">Description</label>
          <textarea id="description-select" name="description" cols="30" rows="3" defaultValue={this.props.description}></textarea><br />

          <label htmlFor="category-select">Category</label>
            <select name="category" id="category-select" defaultValue={this.props.category}>
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
            <select name="condition" id="condition-input" defaultValue={this.props.condition}>
              <option value="">No Selection</option>
              <option value={1}>Brand new</option>
              <option value={2}>Just opened</option>
              <option value={3}>In good condition</option>
              <option value={4}>Used</option>
            </select><br />

            <div>Posted Date: {this.props.postedDate}</div>

            <label htmlFor="expirydate-select">Order Expiry Date</label>
            <input id="expirydate-select" type="date" name="expirydate" defaultValue={this.props.expirationDate}/><br />

            <label htmlFor="expirytime-select">Order Expiry Time</label>
            <input id="expirytime-select" type="time" name="expirytime" defaultValue={this.props.expirationTime}/><br />

          <button onClick={async (e) => {

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
          }}>Save Edits</button>

        </form>

        <button onClick={(e) => {
          this.props.handleToogleEdit(undefined)
        }}>Revert</button>
      </React.Fragment>
    )
  }
}

export default EditBaseOrderInformation