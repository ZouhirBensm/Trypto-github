import '../style/reactDivMobile.css'


class FAQPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (

      // Home
      <React.Fragment>
        <div id="FAQ-high-component">
          <h1>FAQ</h1>
        </div>
      </React.Fragment>

    );
  }



}

const element = <FAQPage />;


ReactDOM.render(element, document.getElementById('react-div'));


export default FAQPage