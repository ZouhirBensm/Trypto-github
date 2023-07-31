import BITCOIN_CHAINS_WALLETS from '../../../full-stack-libs/Types/BitcoinChainsWallets'
import { validateInputs } from '../../../full-stack-libs/validations'
import './style/EditChainWalletInformation.css'



class EditChainWalletInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: null,
      popup: undefined,
      selectedChain: this.props.chain,
      selectedPayment: this.props.payment
    }


    this.onChange = this.onChange.bind(this)
    this.setOptions = this.setOptions.bind(this)
    this.setpopup = this.setpopup.bind(this)
  }


  setOptions(_chain) {
    console.log(_chain)

    if (_chain === BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name) return BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.wallets
    if (_chain === BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name) return BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.wallets
    if (_chain === BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name) return BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.wallets

    return []


  }


  onChange(e) {
    // this.setOptions(e.target.value)
    this.setState({ selectedChain: e.target.value,
    selectedPayment: "" });
  }

  onChange2(e) {
    this.setState({ selectedPayment: e.target.value});
  }

  render() {

    let options = this.setOptions(this.state.selectedChain)

    return (
      <React.Fragment>
        <form className="form gray-box" id="my_form">

          <label htmlFor="chain-input">Chain Network</label>
          <button onClick={(e) => {
            this.props.handleToogleEdit(undefined)
          }}>
            <img src="/img/SVG/market/individual-article/revert2.svg" alt="" />
          </button> <br />


          <select name="chain" id="chain-input" 
          // defaultValue={this.props.chain} 
          value={this.state.selectedChain}
          onChange={(e) => {this.onChange(e);}}
          >
            <option value="">No Selection</option>
            <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name}</option>
            <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name}</option>
            <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name}</option>
          </select> <br />






          <label htmlFor="payment-input">Payment on</label>
          <select name="payment" id="payment-input" 
          // defaultValue={this.props.payment} 
          onChange={(e) => {this.onChange2(e);}}
          value={this.state.selectedPayment}
          >
            <option value="">No Selection</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select> <br />



          {this.state.popup ?
            <span className='popup'>{this.state.popup}</span>
            : null}



          <button className='save-part' onClick={async (e) => {
            e.preventDefault()
            let EditBaseOrderInformation_data = {
              orderID: this.props.orderID,
              chain: this.state.selectedChain,
              payment: this.state.selectedPayment
            }

            let ret_EditValidation = this.EditValidation(EditBaseOrderInformation_data)

            if (ret_EditValidation) {
              let ret_EditFunction3 = await this.EditFunction3(EditBaseOrderInformation_data)
              return
            } else {
              return
            }
          }}>Save</button>
        </form>



      </React.Fragment>
    )
  }

  setpopup(error_message) {
    console.log(`Setting popup: ${error_message}`)
    this.setState({
      popup: error_message
    })
  }



  EditValidation(EditBaseOrderInformation_data) {
    let error_msg_retrieved_if_any

    // console.log(EditBaseOrderInformation_data.chain,
    // this.props.chain,
    // EditBaseOrderInformation_data.payment,
    // this.props.payment,
    // EditBaseOrderInformation_data.chain === this.props.chain && EditBaseOrderInformation_data.payment === this.props.payment)

    if (EditBaseOrderInformation_data.chain === this.props.chain && EditBaseOrderInformation_data.payment === this.props.payment) {

      error_msg_retrieved_if_any = `Nothing has changed, therefor nothing to update!`
      this.setpopup(error_msg_retrieved_if_any)
      return false
    }

    error_msg_retrieved_if_any = validateInputs(EditBaseOrderInformation_data)

    if (error_msg_retrieved_if_any) {
      this.setpopup(error_msg_retrieved_if_any)
      return false
    } else {
      this.setpopup(undefined)
      return true
    }

    return false
  }


  async EditFunction3(EditBaseOrderInformation_data) {
    console.log("Making api call to edit this component!")

    const response = await fetch(`/marketplace/${userId}/update23`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        EditBaseOrderInformation_data
      })
    })

    const json = await response.json()

    console.log(response)
    console.log(json)

    if (response.status === 200) {
      this.props.handleToogleEdit(undefined)
      this.props.loadData()
      return
    } else {
      const message = `Server Error | Please, try again later!`
      this.setpopup(json?.error?.message || message)
      return
    }
  }

}

export default EditChainWalletInformation