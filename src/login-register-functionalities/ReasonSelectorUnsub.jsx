class ReasonSelectorUnsub extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const option1 = "Because A"
    const option2 = "Because B"
    const option3 = "Because C"
    const option4 = "Because D"
    const option5 = "Other"


    return (
      <React.Fragment>
        <div>ReasonSelectorUnsub</div>
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

export default ReasonSelectorUnsub