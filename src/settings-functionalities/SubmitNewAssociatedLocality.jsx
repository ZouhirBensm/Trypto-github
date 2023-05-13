import {validate_location_geometry_inputs} from '../../full-stack-libs/validations'


class SubmitNewAssociatedLocality extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  async validation(){
    let location_data = {
      geometry: {
        lat: this.props.lat,
        lng: this.props.lng
      },
    }

    console.log(location_data)

    let error_msg_retrieved_if_any

    error_msg_retrieved_if_any = validate_location_geometry_inputs(location_data)

    console.log("SubmitNewAssociatedLocality: validation()-> error: ", error_msg_retrieved_if_any)

    if (error_msg_retrieved_if_any) {
      this.props.setpopup(error_msg_retrieved_if_any)
      return false // validation did not pass
    } else { 
      this.props.setpopup(undefined)
      return true // validation passed
    }

  }


  async postNewAssociatedLocality(){

    let response
    let json

    const geometry = {
      lat: this.props.lat,
      lng: this.props.lng
    }

    console.log(`postNewAssociatedLocality(): geometry:`, geometry)

    

    response = await fetch(`/settings/set-users-associated-locality/${this.props.userID_toWorkWith}`, {
      method: this.props.selectedUser.userassociatedlocalityID ? "PUT" : "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(geometry)
    })

    json = await response.json()

    if (response.status == 200) {
      window.location.href = `/settings/set-users-associated-locality?popup=${json.message}`
    } else {
      console.log(json)
      this.props.setpopup(json.error.message)
    }
  }


  render(){
    return (
      <React.Fragment>
        <button onClick={async (e) => {
          e.preventDefault()
          let ret1,ret2
          ret1 = await this.validation()
          console.log(ret1)
          if (ret1) {
            ret2 = await this.postNewAssociatedLocality()
          } else {
            return
          }
        }}>
          Submit
        </button>
      </React.Fragment>
    )
  }
}

export default SubmitNewAssociatedLocality