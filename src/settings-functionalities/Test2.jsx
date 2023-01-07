import { withRouter } from 'react-router-dom';

class Test2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    this.props.history.goBack();
  }

  // componentDidMount(){
  //   let the_map = document.getElementById('the-map');
  //   let autocomplete_block = document.getElementById('autocomplete-block');

  //   the_map.style.display = "none"
  //   autocomplete_block.style.display = "none"
  // }

  render() {
    return (

      <React.Fragment>
        <div>Test2...</div>
        <button type="button" onClick={this.goBack}>
          Go back
        </button>
      </React.Fragment>
    )
  }
}

export default withRouter(Test2)