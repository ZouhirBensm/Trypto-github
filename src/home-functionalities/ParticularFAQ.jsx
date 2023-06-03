import { Link, withRouter } from 'react-router-dom';
import './styles/ParticularFAQ.css'

// import '../style/reactDivMobile.css'






class ParticularFAQ extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  goBack = () => {
    this.props.history.goBack();
  };


  render() {

    return (

      <React.Fragment>
        <div id='faq-particular'>

          <h1>{this.props.faq?.title}</h1>

          {this.props.faq?.inputs.map((input, index)=>{
            return <p key={index}>{input}</p>
          })}

        <Link to='/FAQ'>FAQs</Link>
        <br />

        <button onClick={this.goBack}>
          <img src="/img/SVG/home/faq/back.svg" alt=""/>
        </button>

        
      </div>

      </React.Fragment>

    );
  }



}



export default withRouter(ParticularFAQ);