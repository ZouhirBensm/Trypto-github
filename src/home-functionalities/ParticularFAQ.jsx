import { Link, withRouter } from 'react-router-dom';

// import '../style/reactDivMobile.css'






class ParticularFAQ extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log('\n\nthis.props.testabc: ', this.props.testabc)
  }

  goBack = () => {
    console.log(this.props.history)
    this.props.history.goBack();
  };


  render() {

    return (

      <React.Fragment>
        <div>

          <div>Particualr FAQ</div>
          <Link to='/FAQ'>Root FAQ</Link>
          <br />
          <button onClick={this.goBack}>Go Back</button>

        </div>
      </React.Fragment>

    );
  }



}



export default withRouter(ParticularFAQ);