import UnsubFunction from "./UnsubFunction"
import DeleteFunction from "./DeleteFunction"

import ReasonSelector from "./ReasonSelector"


class Modal extends React.Component {
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

    let Function = null;

    if (this.props.modal_type == 'DeleteModal') {
      Function = <DeleteFunction
        usedUserID={this.props.usedUserID}
        setpopups={this.props.setpopups}
        disable={!this.state.selectedReason}
        selectedReason={this.state.selectedReason}
        customReason={this.state.customReason}
        hasUserInput={this.state.hasUserInput}
        setPopupModal={this.setPopupModal}
        handleOutsideClick={this.props.handleOutsideClick}
        button_display={this.props.button_display}
        modal_type={this.props.modal_type}
      />
    }
    if (this.props.modal_type == 'UnsubModal') {
      Function = <UnsubFunction
        usedUserID={this.props.usedUserID}
        setpopups={this.props.setpopups}
        disable={!this.state.selectedReason}
        selectedReason={this.state.selectedReason}
        customReason={this.state.customReason}
        hasUserInput={this.state.hasUserInput}
        setPopupModal={this.setPopupModal}
        handleOutsideClick={this.props.handleOutsideClick}
        button_display={this.props.button_display}
        modal_type={this.props.modal_type}
      />
    }

    return (
      <React.Fragment>
        <ReasonSelector
          selectedReason={this.state.selectedReason}
          customReason={this.state.customReason}
          hasUserInput={this.state.hasUserInput}
          handleReasonChange={this.handleReasonChange}
          handleCustomReasonChange={this.handleCustomReasonChange}
          modal_type={this.props.modal_type}
        />
        {this.state.popup ? <span id="popup">{this.state.popup}</span> : null}


        {Function}

      </React.Fragment>
    )
  }
}

export default Modal