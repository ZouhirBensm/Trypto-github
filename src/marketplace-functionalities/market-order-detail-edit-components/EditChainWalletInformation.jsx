import BITCOIN_CHAINS_WALLETS from '../../../full-stack-libs/Types/BitcoinChainsWallets'
import { validateInputs } from '../../../full-stack-libs/validations'
import './style/EditChainWalletInformation.css'



class EditChainWalletInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: null,
      popup: undefined
    }
    this.onChange = this.onChange.bind(this)
    this.setOptions = this.setOptions.bind(this)
    this.setpopup = this.setpopup.bind(this)
  }


  componentDidMount() {
    this.setOptions(this.props.chain)
  }

  setOptions(_chain) {
    let options
    let tag_options_arr_data = []
    let message = undefined

    if (_chain == BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name) {
      tag_options_arr_data = BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.wallets
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_chain == BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name) {
      tag_options_arr_data = BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.wallets
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_chain == BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name) {
      tag_options_arr_data = BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.wallets
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else {
      message = `Chain value is not valid `
    }

    this.setpopup(message)

    this.setState({
      options: options
    }, () => {

      let payment_select = document.getElementById("payment-input")
      let options_object = [...payment_select.options].map((option, index) => {
        return { index: index, value: option.value }
      })

      const found = options_object.find(option_object => option_object.value == this.props.payment)

      if (!found) {
        payment_select.options[0].selected = true;
        return
      }

      const selectedIndex = found.index
      console.log(payment_select.options.selectedIndex)
      payment_select.options[selectedIndex].selected = true;
      return
    })
  }


  onChange(e) {
    this.setOptions(e.target.value)
  }

  render() {

    return (
      <React.Fragment>
        <form className="form gray-box" id="my_form">

          <label htmlFor="chain-input">Chain Network</label>
          <button onClick={(e) => {
            this.props.handleToogleEdit(undefined)
          }}>
            <img src="/img/SVG/market/individual-article/revert2.svg" alt="" />  
          </button> <br />


          <select name="chain" id="chain-input" defaultValue={this.props.chain} onChange={(e) => {
            this.onChange(e);
          }}>
            <option value="">No Selection</option>
            <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name}</option>
            <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name}</option>
            <option value={BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name}>{BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name}</option>
          </select> <br />






          <label htmlFor="payment-input">Payment on</label>
          <select name="payment" id="payment-input" defaultValue={this.props.payment} >
            <option value="">No Selection</option>
            {this.state.options}
          </select> <br />



          {this.state.popup ?
          <span className='popup'>{this.state.popup}</span>
          : null}



          <button className='save-part' onClick={async (e) => {
            e.preventDefault()
            let EditBaseOrderInformation_data = {
              orderID: this.props.orderID,
              chain: document.getElementById("my_form").elements["chain"].value,
              payment: document.getElementById("my_form").elements["payment"].value,
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