

class AddFAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      inputs: [''] // Start with one input
    };
  }

  addInput = () => {
    this.setState(prevState => {
      const updatedInputs = [...prevState.inputs];
      return { inputs: [...prevState.inputs, ''] }
    });
  };

  handleChangeInputs = (index) => (event) => {
    const { value } = event.target;
    this.setState(prevState => {
      const updatedInputs = [...prevState.inputs];
      updatedInputs[index] = value;
      return { inputs: updatedInputs };
    });
  };

  handleChangeTitle = () => (event) => {

    console.log(event)

    const { value } = event.target;

    this.setState({
      title : value
    });
  };

  deleteInput = (index) => {
    this.setState(prevState => {
      const updatedInputs = [...prevState.inputs];
      

      updatedInputs.splice(index, 1); // Remove the input at the specified index
      return { inputs: updatedInputs };
    });
  };
  

  render() {
    const { inputs } = this.state;

    return (
      <React.Fragment>
        <div>
          <h1>FAQ</h1>

          <label htmlFor="title">Title</label>
          <br />
          <input type="text" onChange={this.handleChangeTitle()} name='title'/>
          <br />
          <br />
          <br />

          <label>Inputs</label>
          <br />
          {inputs.map((input, index) => (
            <React.Fragment key={index}>
              <input value={input} onChange={this.handleChangeInputs(index)} />
              {
                this.state.inputs.length === 1 ? 
                null
                :
                <button onClick={() => this.deleteInput(index)}>Delete</button>
              }
              <br />
            </React.Fragment>
          ))}
          <br />
          <button onClick={this.addInput}>Add Input</button>
        </div>
        <br />

        <button>Submit</button>
        <br />
        <br />
        <a href='/operations'>Back</a>
      </React.Fragment>
    );
  }
}

const element = <AddFAQ />;
ReactDOM.render(element, document.getElementById('react-div'));

export default AddFAQ;
