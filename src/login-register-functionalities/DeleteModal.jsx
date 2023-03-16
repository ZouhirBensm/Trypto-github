import DeleteFunction from "./DeleteFunction"
import ReasonSelector from "./ReasonSelector"


class DeleteModal extends React.Component {
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
    const option5 = "Other"

    return this.setState({ 
      selectedReason: selectedReason,
      customReason: '',
      hasUserInput: false,
      popup: ''
    });

    // return this.setState({ customReason:  });
  }

  handleCustomReasonChange = (changeEvent) => {
    const customReason = changeEvent.target.value;
    return this.setState({ 
      customReason: customReason,
      hasUserInput: !!customReason,
      popup: ''
    });
  }

  setPopupModal(popup){
    this.setState({
      popup: popup
    })
  }


  render() {

    return (
      <React.Fragment>
        <ReasonSelector
          selectedReason={this.state.selectedReason}
          customReason={this.state.customReason}
          hasUserInput={this.state.hasUserInput}
          handleReasonChange={this.handleReasonChange}
          handleCustomReasonChange={this.handleCustomReasonChange}
        />

        {/* <p>selectedReason: {this.state.selectedReason}</p>
        <p>customReason: {this.state.customReason}</p>
        <p>hasUserInput: {this.state.hasUserInput}</p> */}


        <DeleteFunction
          usedUserID={this.props.usedUserID}
          setpopups={this.props.setpopups}
          disableDelete={!this.state.selectedReason}
          selectedReason={this.state.selectedReason}
          customReason={this.state.customReason}
          hasUserInput={this.state.hasUserInput}
          setPopupModal={this.setPopupModal}
        />
        
        {this.state.popup ? <p>{this.state.popup}</p>: null}

      </React.Fragment>
    )
  }
}

export default DeleteModal