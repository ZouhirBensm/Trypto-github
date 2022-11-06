
import '../style/reactDivMobile.css'

// import MakeMarketOrder from './CopyMakeMarketOrder'


class _4_InputImagesMarketOrder extends React.Component {


  render(){

    return (
      <React.Fragment>
        <div>_4_InputImagesMarketOrder...</div>
        {/* <MakeMarketOrder/> */}
        <button onClick={(e) => {
          this.props.previousStep(e)
        }}>Previous</button>
      </React.Fragment>
    )
  }
}

export default _4_InputImagesMarketOrder
