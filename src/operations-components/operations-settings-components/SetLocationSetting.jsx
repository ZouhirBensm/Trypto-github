import '../styles/SetLocationSetting.css'


class SetLocationSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log("SetLocationSetting: constructor()->this.props: ", this.props)
    this.makeRequest = this.makeRequest.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    this.props.history.goBack();
  }

  async makeRequest(e) {
    e.preventDefault()
    console.log("better submission")

    let lat = document.getElementById("edit-locality").elements["lat"].value
    let lng = document.getElementById("edit-locality").elements["lng"].value


    let response, json
    response = await fetch(`/operations/set-settings/${this.props.comprehensiveSelectedUserInfoDataObj._id}/set-users-associated-locality`, {
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
      window.location.href = `/operations/set-settings/${this.props.comprehensiveSelectedUserInfoDataObj._id}/set-users-associated-locality?comprehensiveSelectedUserInfo=${JSON.stringify(json.updated_user)}&popup=${json.message}`
      // this.props.setpopup(json.message)
    } else {
      console.log(json)
      this.props.setpopup(json.error.message)
    }
  }



  render() {
    return (
      <React.Fragment>

        <div id="set-users-location">


          <dl>
            <dt>Component:</dt>
            <dd>{this.constructor.name}</dd>
            <dt>User ID Setting:</dt>
            <dd>{this.props.comprehensiveSelectedUserInfoDataObj._id}</dd>
          </dl>


          <h3 className="h3-bold">Associated Locality</h3>


          <div id="does-have-locality">
          {this.props.comprehensiveSelectedUserInfoDataObj.userassociatedlocalityID ?
          <div>
            <img src="/img/SVG/settings/box.svg" alt="" />
            <span>{this.props.comprehensiveSelectedUserInfoDataObj.userassociatedlocalityID.location.address}</span>
          </div> : 
          
          <img src="/img/SVG/settings/unbox.svg" alt="" />

          }
        </div>



          <h3 className="h3-bold">Configure one</h3>

          <form className="form" id="edit-locality" onSubmit={this.makeRequest}>
            <label htmlFor="lat-input">Latitude:</label>
            <input type="number" id="lat-input" name="lat" step="0.0000000001" required placeholder='latitude'/>


            <label htmlFor="lng-input">Longitude:</label>
            <input type="number" id="lng-input" name="lng" step="0.0000000001" required placeholder='longitude'/>


            <button onClick={(e) => {
              this.props.setpopup(undefined)
            }}>Post</button>

          </form>



          {this.props.popup ?
            <span id='popup'>{this.props.popup}</span>
            : null}



          <div id='resource-latlng'>
            <strong>Resource: </strong>
            <span>
              Address  LAT, and LNG:
            </span>
            <a href="https://www.google.com/maps" target="_blank">Google Maps</a>
          </div>






          {/* <a href={`/operations/set-settings/${this.props.comprehensiveSelectedUserInfoDataObj._id}?comprehensiveSelectedUserInfo=${JSON.stringify(this.props.comprehensiveSelectedUserInfoDataObj)}`}>Back</a> <br/> */}

          <button type="button" onClick={this.goBack}>
            <img src="/img/SVG/operations/global/back.svg" alt="" />
          </button>

        </div>



      </React.Fragment>
    )
  }
}

export default SetLocationSetting
// export default withRouter(SetLocationSetting)