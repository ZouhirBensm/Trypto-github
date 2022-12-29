import '../styles/SubmitCurrencyOrderButton.css' 
import { validateInputs, validateExpiry } from '../../../full-stack-libs/validations'


class SubmitCurrencyOrderButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.createCurrencyOrder = this.createCurrencyOrder.bind(this)
  }

  

  componentDidMount() {

    var currencySubmitButton = document.getElementById("currency-submit")
    currencySubmitButton.disabled = true
    const rand_delta = Number((Math.random() * 100).toFixed(2))
    const fake_delay = 1000 + rand_delta

    setTimeout(()=>{
      currencySubmitButton.disabled = false
    }, fake_delay)
  }

  async createCurrencyOrder(e) {
    e.preventDefault()

    let [url_param_order_type_to_save, amount_s] = []

    caseOptionBTClayerexchange === "makebuy" ? [url_param_order_type_to_save, amount_s] = ["buyorders", ["amount"]] :
    caseOptionBTClayerexchange === "makesell" ? [url_param_order_type_to_save, amount_s] = ["sellorders", ["minamount", "maxamount"]] :
    null

    let amount_fields_obj = {}
    for (const field of amount_s) {
      amount_fields_obj[field] = document.getElementById("form_id").elements[field].value
    }

    let btc_orderinfo = {
      chain: document.getElementById("form_id").elements["chain"].value,
      ...amount_fields_obj,
      rate: document.getElementById("form_id").elements["price"].value,
      expirydate: document.getElementById("form_id").elements["expirydate"].value,
      expirytime: document.getElementById("form_id").elements["expirytime"].value
    }

    const country = document.getElementById("form_id").elements["country"].value
    let province_state

    if (country == 'Canada') {
      province_state = document.getElementById("form_id").elements["province"].value
    } else if (country == 'United States') {
      province_state = document.getElementById("form_id").elements["state"].value
    }

    let btc_orderinfo_location = {
      country: country,
      province_state: province_state,
    }

    console.log("SubmitCurrencyOrderButton->createCurrencyOrder(): btc_orderinfo, btc_orderinfo_location", btc_orderinfo, btc_orderinfo_location)

    let error = validateInputs({ ...btc_orderinfo, ...btc_orderinfo_location }) || validateExpiry(btc_orderinfo)

    error = parseInt(btc_orderinfo.minamount) > parseInt(btc_orderinfo.maxamount) && !error ? "Min Amount Cannot be superior than Max Amount, please edit, and resubmit." : error

    if (error) return this.props.displayPopup(error)

    const hny_spm = document.getElementById("form_id").elements["hny_spm"].value

    if (hny_spm != "") {
      const rand_delta = Number((Math.random() * 100).toFixed(2))
      const fake_api_delay = 900 + rand_delta
      setTimeout(() => {
        this.props.displayPopup("You have successfully made an order")
        return
      },
        fake_api_delay)
      return
    }

    let response = await fetch(`/currency/${url_param_order_type_to_save}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ ...btc_orderinfo, ...btc_orderinfo_location })
    })

    console.log("SubmitCurrencyOrderButton: createCurrencyOrder(): response->", response)

    switch (response.status) {
      case 200:
        this.props.displayPopup("You have successfully made an order")
        break;
      case 500:
        console.log(500)
        this.props.displayPopup("An issue has occured, please try again later. A website maintainer is looking into the mater.")
        break;
      default:
        break;
    }

    let json_SRV = await response.json()
    console.log("MakeCurrencyOrder: createCurrencyOrder(): json_SRV->", json_SRV)
  }

  render() {

    return (
      <React.Fragment>
        <button type="submit" id='currency-submit' onClick={(e) => this.createCurrencyOrder(e)}>Submit</button>
      </React.Fragment>
    )
  }
}

export default SubmitCurrencyOrderButton