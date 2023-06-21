import '../style/reactDivMobile.css'
import SubmitFAQ from '../operations-components/SubmitFAQ'
import './styles/AddFAQ.css'

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

  deleteInput = (index) => {
    this.setState(prevState => {
      const updatedInputs = [...prevState.inputs];
      

      updatedInputs.splice(index, 1); // Remove the input at the specified index
      return { inputs: updatedInputs };
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

    // console.log(event)

    const { value } = event.target;

    this.setState({
      title : value
    });
  };


  

  render() {
    const { inputs } = this.state;

    return (
      <React.Fragment>
        <div id='add-faq-container'>

          <div>

            <h1>FAQ</h1>

            <label htmlFor="title">Title</label>
            <input type="text" onChange={this.handleChangeTitle()} name='title' placeholder='FAQ Title'/>

            <label>Inputs</label>
            {inputs.map((input, index) => (
              <React.Fragment key={index}>
                <input value={input} onChange={this.handleChangeInputs(index)} placeholder={`Input ${index+1}`}/>
                {
                  this.state.inputs.length === 1 ? 
                  null
                  :
                  <button className='trash' onClick={() => this.deleteInput(index)}>
                    <img src="/img/SVG/operations/global/trash.svg" alt="" />
                  </button>
                }
                <br />
              </React.Fragment>
            ))}
            <button className='add' onClick={this.addInput}>
              <img src="/img/SVG/operations/global/aadd.svg" alt="" />
            </button>
          </div>

          <SubmitFAQ
            title={this.state.title}
            inputs={this.state.inputs}
          />

          <a href='/operations'>
            <img src="/img/SVG/operations/global/back.svg" alt="" />
          </a>
        </div>

      </React.Fragment>
    );
  }
}

const element = <AddFAQ />;
ReactDOM.render(element, document.getElementById('react-div'));

export default AddFAQ;
