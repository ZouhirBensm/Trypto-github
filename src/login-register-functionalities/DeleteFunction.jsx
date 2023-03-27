class DeleteFunction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
  }

  async handleProfileDeletion(reason, e = null) {
    e?.preventDefault()
    e?.stopPropagation()

    if(!reason) return
    const userId = this.props.usedUserID
    console.log(userId, reason)

    let response

    response = await fetch(`/users/profile/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        reason: reason,
      })
    })

    let srv_
    srv_ = await response.json()

    // console.log("\n\nhandleProfileDeletion: response", response)
    // console.log("\n\nhandleProfileDeletion: srv_", srv_)
    

    if (response.status === 200) {
    // if (false) {
      if (srv_.referer === "users") {
        // console.log(`/?popup=${srv_.srv_}`)
        window.location.href = `/?popup=${srv_.srv_}`;
        return
      }

      if (srv_.referer === "operations") {
        window.location.href = `/operations/manage-subs`;
        return
      }

      let error = new Error("Delete succeeded, but the response srv_.referer does not match the registed ones!")
      console.error(error)
      return

    } else {
      this.props.setpopups(srv_.error.message.admin_message)
      // this.props.setpopups("Testing setpopups method.")
      return
    }
  }


  render() {

    return (
      <React.Fragment>
        <button disabled={this.props.disableDelete} onClick={(e) => {

          try {
            const reason = this.reasonDeterminator(e)
            this.handleProfileDeletion(reason, e)
          } catch (error) {
            console.log("Error on delete button: ", error)
          }
        }}>Delete Account</button>
      </React.Fragment>
    )
  }


  reasonDeterminator(e) {
    // console.log(this.props.selectedReason)
    // console.log(this.props.customReason)
    // console.log(this.props.hasUserInput)

    const option5 = 'Other'

    let reason
    if(this.props.selectedReason != option5) {
      reason = this.props.selectedReason
      return reason
    }

    if(!this.props.hasUserInput) {
      const popup = "Please submit reason"
      return this.props.setPopupModal(popup)
    }

    reason = this.props.customReason
    return reason
  }



}

export default DeleteFunction