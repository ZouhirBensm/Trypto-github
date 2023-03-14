
class DeleteAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
  }

  async handleProfileDeletion(e) {
    e.preventDefault()
    const userId = this.props.usedUserID

    let response
    response = await fetch(`/users/profile/delete/${userId}`, {
      method: 'DELETE',
    })


    let srv_
    srv_ = await response.json()

    console.log("handleProfileDeletion: response, srv_: ", response, srv_)

    if (response.status === 200) {


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
      return
    }
  }


  render() {
    return (
      <React.Fragment>
        <button onClick={(e) => {
          try {
            this.handleProfileDeletion(e)
          } catch (error) {
            console.log("Error on delete button: ", error)
          }
        }}>Delete Account</button>
      </React.Fragment>
    )
  }
}

export default DeleteAccount


// TODO make this into a VS code JSX template