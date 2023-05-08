import './styles/ReasonSelector.css'


class ReasonSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let option1, option2, option3, option4, h1
    if (this.props.modal_type == 'DeleteModal'){
      option1 = "This subscription is overpriced"
      option2 = "I currently have a second account"
      option3 = "This app is not performant enough for my taste"
      option4 = "I'm concerned about my data"
      h1 = "deletion"
    }
    if (this.props.modal_type == 'UnsubModal'){
      option1 = "The benefits of the plan did not satisfy me."
      option2 = "For personal financal reasons."
      option3 = "I already have a subscription for the same service elsewhere."
      option4 = "I plan to re-subscribe later on."
      h1 = "unsubscription"
    }
    const option5 = "Other"


    return (
      <React.Fragment>
        <div className='modal-content'>
          <h1>Reason for your {h1}?</h1>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="options"
                value={option1}
                checked={this.props.selectedReason === option1}
                onChange={this.props.handleReasonChange}
              />
              <span>
                {option1}
              </span>
            </label>

            <label>
              <input
                type="radio"
                name="options"
                value={option2}
                checked={this.props.selectedReason === option2}
                onChange={this.props.handleReasonChange}
              />
              <span>
                {option2}
              </span>
            </label>

            <label>
              <input
                type="radio"
                name="options"
                value={option3}
                checked={this.props.selectedReason === option3}
                onChange={this.props.handleReasonChange}
              />
              <span>
                {option3}
              </span>
            </label>

            <label>
              <input
                type="radio"
                name="options"
                value={option4}
                checked={this.props.selectedReason === option4}
                onChange={this.props.handleReasonChange}
              />
              <span>
                {option4}
              </span>
            </label>

            <label>
              <input
                type="radio"
                name="options"
                value={option5}
                checked={this.props.selectedReason === option5}
                onChange={this.props.handleReasonChange}
              />
              <span>
                {option5}
              </span>
            </label>

          </div>

        </div>


        {this.props.selectedReason == option5 && (
          <div id='custom-reason-input-container'>
            <input
              type="text"
              placeholder='Enter you custom reason'
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