import './styles/_4_ContentStructure.css'

import SECTION_TYPES from '../../../full-stack-libs/Types/ArticleSectionTypes'


class _4_ContentStructure extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selects: this.props.content_structure || [SECTION_TYPES.H2], // Start with one input
      options: undefined,
    }

  }


  componentDidMount(){
    let options = []

    const sectionTypesKeys = Object.keys(SECTION_TYPES);

    sectionTypesKeys.forEach((SECTION_TYPE_key, index) => {
      const SECTION_TYPE_val = SECTION_TYPES[SECTION_TYPE_key];
      options.push(
        <option value={SECTION_TYPE_val} key={index}>{SECTION_TYPE_val}</option>
      );
    });

    this.setState({
      options: options
    })
  }

  addSelect = () => {
    this.setState(prevState => {
      const updateSelects = [...prevState.selects];
      return { selects: [...prevState.selects, ''] }
    });
  };

  deleteSelect = (index) => {
    this.setState(prevState => {
      const updatedSelects = [...prevState.selects];


      updatedSelects.splice(index, 1); // Remove the input at the specified index
      return { selects: updatedSelects };
    });
  };

  handleChangeInputs = (index) => (event) => {
    const { value } = event.target;
    this.setState(prevState => {
      const updatedSelects = [...prevState.selects];
      updatedSelects[index] = value;
      return { selects: updatedSelects };
    });
  };



  render() {

    const { selects } = this.state;



    return (
      <React.Fragment>

        <div id="structure-setter">

          <div>

            <h1>Setting your blog's content structure</h1>

            <label>Structure</label>
            {selects.map((select, index) => (
              <React.Fragment key={index}>

                {/*

                required onChange={(e) => this.locationChange(e)}   onChange={this.handleChangeInputs(index)} 
                */}
                <select required value={this.state.selects[index]} name="content_structure" onChange={this.handleChangeInputs(index)}>
                  <option value="" defaultValue>N/A</option>
                  {this.state.options}
                </select>
                {
                  this.state.selects.length === 1 ?
                    null
                    :
                    <button className='trash' onClick={() => this.deleteSelect(index)}>
                      <img src="/img/SVG/operations/global/trash.svg" alt="" />
                    </button>
                }
                <br />
              </React.Fragment>
            ))}


            <button className='add' onClick={this.addSelect}>
              <img src="/img/SVG/operations/global/aadd.svg" alt="" />
            </button>
          </div>


        </div>




        <div id='nav'>
          <img src="/img/SVG/operations/create-article/previous.svg" alt="" />
          <button onClick={(e) => this.props.previousStep()}>Previous </button>
          <button onClick={(e) => {
            const isValid = this.props.validateInputs(e)
            console.log({ isValid })
            if (!isValid) return
            this.props.handleChange(e, {
              name: 'content_structure',
              value: this.state.selects
            })
            this.props.nextStep(e)
            return

          }}>Proceed</button>
          <img src="/img/SVG/operations/create-article/proceed.svg" alt="" />
        </div>



      </React.Fragment>
    )
  }
}

export default _4_ContentStructure