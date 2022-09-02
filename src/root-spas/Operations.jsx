import '../style/reactDivMobile.css'

class Operations extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
    
  render() {
    return (
      <h1>Not sure what to put in the operations page for now</h1>
    );
  }
}

const element = <Operations />;


ReactDOM.render(element, document.getElementById('react-div'));


export default Operations

