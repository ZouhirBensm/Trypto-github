class SameDisplays extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <button disabled={this.props.disableDelete} onClick={(e) => {

          try {
            const reason = this.reasonDeterminator(e)
            this.props.function(reason, e)
          } catch (error) {
            console.log("Error on delete button: ", error)
          }
          
        }}>{this.props.button_display}</button>
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

export default SameDisplays