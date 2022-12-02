
import {validateInputs} from '../../../full-stack-libs/validations'

class EditBaseOrderInformation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      popup: undefined
    }
    this.setpopup = this.setpopup.bind(this)
  }

  setpopup(error_message){
    console.log(`Setting popup: ${error_message}`)
  }

  EditValidation() {
    let error_msg_retrieved_if_any
    let EditBaseOrderInformation_data = {
      newtitle: document.getElementById("my_form").elements["title"].value,
    }

    if(EditBaseOrderInformation_data.newtitle === this.props.title) {
      error_msg_retrieved_if_any = `Nothing has changed, therefor nothing to update!`
      this.setpopup(error_msg_retrieved_if_any)
      return false
    }

    error_msg_retrieved_if_any = validateInputs(EditBaseOrderInformation_data)

    if (error_msg_retrieved_if_any) {
      this.setpopup(error_msg_retrieved_if_any)
      return false
    } 
    else { return true }
  }

  async EditFunction1() {
    console.log("Making api call to edit this component!")

    let EditBaseOrderInformation_data = {
      orderID: this.props.orderID,
      newtitle: document.getElementById("my_form").elements["title"].value,
    }

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

  render(){
    return (
      <React.Fragment>

        <form className="form" id="my_form">
          <label htmlFor="title-select">Title</label>
          <input type="text" id="title-select" name="title" defaultValue={this.props.title}/><br />

          <button onClick={async (e)=>{
            e.preventDefault()
            let ret_EditValidation = this.EditValidation()
            if (ret_EditValidation) {
              let ret_EditFunction1 = await this.EditFunction1()
              return
            } else {
              return
            }
          }}>Save Edits</button>

        </form>

        <button onClick={(e)=>{
          this.props.handleToogleEdit(undefined)
        }}>Revert</button>
      </React.Fragment>
    )
  }
}

export default EditBaseOrderInformation