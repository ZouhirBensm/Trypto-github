import '../style/reactDivMobile.css'


class TermsConditions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (

      // Home
      <React.Fragment>
        <div id="terms-conditions-high-component">
          <h1>TermsConditions</h1>
        </div>
      </React.Fragment>

    );
  }



}

const element = <TermsConditions />;


ReactDOM.render(element, document.getElementById('react-div'));


export default TermsConditions