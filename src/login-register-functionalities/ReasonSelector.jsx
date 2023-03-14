class ReasonSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleOptionChange = (changeEvent) => {
    const selectedOption = changeEvent.target.value;
    this.props.onOptionChange(selectedOption);
  }

  render() {

    return (
      <React.Fragment>
        <div>ReasonSelector</div>

        <div className="radio-buttons">
        <label>
          <input
            type="radio"
            name="options"
            value="option1"
            checked={this.props.selectedOption === 'option1'}
            onChange={this.handleOptionChange}
          />
          Option 1
        </label>

        <label>
          <input
            type="radio"
            name="options"
            value="option2"
            checked={this.props.selectedOption === 'option2'}
            onChange={this.handleOptionChange}
          />
          Option 2
        </label>

        <label>
          <input
            type="radio"
            name="options"
            value="option3"
            checked={this.props.selectedOption === 'option3'}
            onChange={this.handleOptionChange}
          />
          Option 3
        </label>
      </div>

      </React.Fragment>
    )
  }
}

export default ReasonSelector