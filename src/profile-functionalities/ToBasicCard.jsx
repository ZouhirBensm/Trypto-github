import './styles/ToBasicCard.css'

class ToBasicCard extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidUpdate(prevProps){
    // console.log("ToBasicCard", this.props.modal)
  }

  render(){
    // console.log("ToBasicCard", this.props.modal)
    return (
      <React.Fragment>
        <div>
          <h3>Basic</h3>
          <span>5$ per month</span>
          <div>The items you post for sale get placed on top of the stack</div>
          <div>Priority for customer service</div>
        </div>
        {/* <div id='upgrade-content-id'>
        </div> */}
      </React.Fragment>
    );
  }

}

export default ToBasicCard