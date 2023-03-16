class ReasonSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // inputValue: '',
      // hasUserInput: false,
    };
  }


  // handleInputChange = (event) => {
  //   const { value } = event.target;
  //   this.setState({
  //     inputValue: value,
  //     hasUserInput: !!value,
  //   });
  // };

  render() {

    // const { inputValue, hasUserInput } = this.state;


    const option1 = "This subscription is overpriced"
    const option2 = "I currently have a second account"
    const option3 = "This app is not performant enough for my taste"
    const option4 = "I'm concerned about my data"
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

        {/* <input type="text" value={inputValue} onChange={this.handleInputChange} />
      <p>{hasUserInput ? 'User input detected!' : 'Waiting for user input...'}</p> */}

      </React.Fragment>
    )
  }
}

export default ReasonSelector