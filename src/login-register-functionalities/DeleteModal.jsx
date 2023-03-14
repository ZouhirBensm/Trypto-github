import DeleteFunction from "./DeleteFunction"
import ReasonSelector from "./ReasonSelector"


class DeleteModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: ''
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  handleOptionChange = (selectedOption) => {
    this.setState({ selectedOption });
  }



  render() {

    return (
      <React.Fragment>
        <ReasonSelector
          selectedOption={this.state.selectedOption}
          onOptionChange={this.handleOptionChange}
        />
        <p>Selected option: {this.state.selectedOption}</p>
        <DeleteFunction
          usedUserID={this.props.usedUserID}
          setpopups={this.props.setpopups}
          disableDelete={!this.state.selectedOption}
          selectedOption={this.state.selectedOption}
        />

      </React.Fragment>
    )
  }
}

export default DeleteModal