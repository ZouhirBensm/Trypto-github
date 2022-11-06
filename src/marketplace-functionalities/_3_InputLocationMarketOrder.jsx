
import '../style/reactDivMobile.css'


class _3_InputLocationMarketOrder extends React.Component {


  render(){

    return (
      <React.Fragment>
        <div>_3_InputLocationMarketOrder...</div>
        {/* <MakeMarketOrder/> */}
        <button onClick={(e) => {
          this.props.previousStep(e)
        }}>Previous</button>
        <button onClick={(e) => {
          this.props.nextStep(e)
        }}>Next</button>
      </React.Fragment>
    )
  }
}

export default _3_InputLocationMarketOrder
