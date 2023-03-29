class ReasonSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let option1, option2, option3, option4
    if (this.props.modal_type == 'DeleteModal'){
      option1 = "This subscription is overpriced"
      option2 = "I currently have a second account"
      option3 = "This app is not performant enough for my taste"
      option4 = "I'm concerned about my data"
    }
    if (this.props.modal_type == 'UnsubModal'){
      option1 = "The benefits of the plan did not satisfy me."
      option2 = "For personal financal reasons."
      option3 = "I already have a subscription for the same service elsewhere."
      option4 = "I plan to re-subscribe later on. I'm only pausing my payments."
    }
    const option5 = "Other"


    return (
      <React.Fragment>
        <div>ReasonSelector</div>
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              name="options"
              value={option1}
              checked={this.props.selectedReason === option1}
              onChange={this.props.handleReasonChange}
            />
            {option1}
          </label> <br />

          <label>
            <input
              type="radio"
              name="options"
              value={option2}
              checked={this.props.selectedReason === option2}
              onChange={this.props.handleReasonChange}
            />
            {option2}
          </label> <br />

          <label>
            <input
              type="radio"
              name="options"
              value={option3}
              checked={this.props.selectedReason === option3}
              onChange={this.props.handleReasonChange}
            />
            {option3}
          </label> <br />

          <label>
            <input
              type="radio"
              name="options"
              value={option4}
              checked={this.props.selectedReason === option4}
              onChange={this.props.handleReasonChange}
            />
            {option4}
          </label> <br />

          <label>
            <input
              type="radio"
              name="options"
              value={option5}
              checked={this.props.selectedReason === option5}
              onChange={this.props.handleReasonChange}
            />
            {option5}
          </label> <br />

        </div>


        {this.props.selectedReason == option5 && (
          <div>
            <br />
            <input
              type="text"
              value={this.props.customReason}
              onChange={this.props.handleCustomReasonChange}
            />
          </div>
        )}

      </React.Fragment>
    )
  }
}

export default ReasonSelector