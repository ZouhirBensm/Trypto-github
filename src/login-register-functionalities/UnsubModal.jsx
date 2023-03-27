import UnsubFunction from "./UnsubFunction"
import ReasonSelectorUnsub from "./ReasonSelectorUnsub"


class UnsubModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedReason: '',
      customReason: '',
      hasUserInput: false,
      popup: ''
    }
    this.handleReasonChange = this.handleReasonChange.bind(this)
    this.handleCustomReasonChange = this.handleCustomReasonChange.bind(this)
    this.setPopupModal = this.setPopupModal.bind(this)
  }

  handleReasonChange = (changeEvent) => {
    const selectedReason = changeEvent.target.value;
    return this.setState({
      selectedReason: selectedReason,
      customReason: '',
      hasUserInput: false,
      popup: ''
    });
  }

  handleCustomReasonChange = (changeEvent) => {
    const customReason = changeEvent.target.value;
    return this.setState({
      customReason: customReason,
      hasUserInput: !!customReason,
      popup: ''
    });
  }

  setPopupModal(popup) {
    this.setState({
      popup: popup
    })
  }

  render() {
    return (
      <React.Fragment>
        <ReasonSelectorUnsub
          selectedReason={this.state.selectedReason}
          customReason={this.state.customReason}
          hasUserInput={this.state.hasUserInput}
          handleReasonChange={this.handleReasonChange}
          handleCustomReasonChange={this.handleCustomReasonChange}
        />

        <UnsubFunction
          usedUserID={this.props.usedUserID}
          setpopups={this.props.setpopups}
          disableDelete={!this.state.selectedReason}
          selectedReason={this.state.selectedReason}
          customReason={this.state.customReason}
          hasUserInput={this.state.hasUserInput}
          setPopupModal={this.setPopupModal}
          handleOutsideClick={this.props.handleOutsideClick}
        />

        {this.state.popup ? <p>{this.state.popup}</p>: null}
      </React.Fragment>
    )
  }
}

export default UnsubModal