import './styles/MakeCurrencyOrder.css'

import MakeCurrencyOrderExpiry from './make-currency-order-components/MakeCurrencyOrderExpiry'
import MakeCurrencyOrderLocation from './make-currency-order-components/MakeCurrencyOrderLocation'
import MakeCurrencyOrderNumbers from './make-currency-order-components/MakeCurrencyOrderNumbers'
import MakeCurrencyOrderChainPayment from './make-currency-order-components/MakeCurrencyOrderChainPayment'
import SubmitCurrencyOrderButton from './make-currency-order-components/SubmitCurrencyOrderButton'

// TODO !! needs destructuring and refactoring i.e. the component is too big!!

class MakeCurrencyOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup_state: null,
    }
    this.displayPopup = this.displayPopup.bind(this)
    // console.log("MakeCurrencyOrder->constructor()", this.props.match.params.type, caseOptionBTClayerexchange, paths_URL, URL_)
  }

  displayPopup(error = undefined) {
    if (!error) return undefined
    this.setState({
      popup_state: error
    }, () => {
      let container = document.getElementsByClassName("make-container")[0]
      container.scrollTo(0, container.scrollHeight);
    })
  }



  render() {

    return (
      <div className="make-container">

        <form className="form" id="form_id">

          <h3>Making a {caseOptionBTClayerexchange} order...</h3>


          <MakeCurrencyOrderExpiry/>

          <MakeCurrencyOrderLocation/>

          <MakeCurrencyOrderNumbers/>

          <MakeCurrencyOrderChainPayment/>


          <input type="text" name="hny_spm"/><br />

          <SubmitCurrencyOrderButton
            displayPopup={this.displayPopup}
          />

        </form><br />


        {this.state.popup_state ?
          <p>{this.state.popup_state}</p>
          : null}
      </div>

    );
  }
  //_________________________________________________________________
}

export default MakeCurrencyOrder