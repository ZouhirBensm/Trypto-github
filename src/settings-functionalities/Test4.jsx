
class Test4 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount(){
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    the_map.style.display = "none"
    autocomplete_block.style.display = "none"
  }
  
  render(){
    return (
      <React.Fragment>
      <div>Test4...</div>
      <a href="/settings">Back</a>
    </React.Fragment>
    )
  }
}

export default Test4