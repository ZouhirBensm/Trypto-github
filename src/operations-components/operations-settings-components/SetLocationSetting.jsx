

class SetLocationSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log("SetLocationSetting: constructor()->this.props: ", this.props)
    this.makeRequest = this.makeRequest.bind(this)
  }


  async makeRequest(e) {
    e.preventDefault()
    console.log("better submission")

    let lat = document.getElementById("edit-locality").elements["lat"].value
    let lng = document.getElementById("edit-locality").elements["lng"].value


    let response, json
    response = await fetch(`/operations/set-settings/set-users-associated-locality/${this.props.comprehensiveSelectedUserInfoDataObj._id}`, {
      method: this.props.comprehensiveSelectedUserInfoDataObj.userassociatedlocalityID ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        lat: lat,
        lng: lng
      })
    })

    console.log(response)
    json = await response.json()

    if (response.status == 200) {
      window.location.href = `/operations/set-settings/set-users-associated-locality?comprehensiveSelectedUserInfo=${JSON.stringify(json.updated_user)}&popup=${json.message}`
      // this.props.setpopup(json.message)
    } else {
      console.log(json)
      this.props.setpopup(json.error.message)
    }
  }



  render() {
    return (
      <React.Fragment>
        <div>SetLocationSetting...{this.props.comprehensiveSelectedUserInfoDataObj._id}</div>
        <div>
        Does this user have a associated locality? 
        {this.props.comprehensiveSelectedUserInfoDataObj.userassociatedlocalityID ?
          " ✅ " + this.props.comprehensiveSelectedUserInfoDataObj.userassociatedlocalityID.location.address
          :
          " ❌"}
        </div>

        <h3>Configure one: </h3>
        <span>Entre wanted Lat, and Lng for this user:</span>

        <form className="form" id="edit-locality" onSubmit={this.makeRequest}>
          <label htmlFor="lat-input">Latitude:<input type="number" id="lat-input" name="lat" step="0.0000000001" required /></label><br />

          <label htmlFor="lng-input">Longitude:<input type="number" id="lng-input" name="lng" step="0.0000000001" required /></label><br />
          <input type="submit" value="Post!" onClick={(e)=>{
            this.props.setpopup(undefined)
          }}/>
        </form> <br /><br />


        {this.props.popup ?
          <p>{this.props.popup}</p>
          : null}

        <div><strong>Resource:</strong> convert address to LAT, and LNG: </div>
        <a href="https://www.google.com/maps" target="_blank">Google Maps</a> <br /><br />




      </React.Fragment>
    )
  }
}

export default SetLocationSetting