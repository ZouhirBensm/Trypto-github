import '../style/MakeCurrencyOrder.css'

import MakeCurrencyOrderExpiry from './make-currency-order-components/MakeCurrencyOrderExpiry'
import MakeCurrencyOrderLocation from './make-currency-order-components/MakeCurrencyOrderLocation'
import MakeCurrencyOrderNumbers from './make-currency-order-components/MakeCurrencyOrderNumbers'
import MakeCurrencyOrderChainPayment from './make-currency-order-components/MakeCurrencyOrderChainPayment'


// TODO !! needs destructuring and refactoring i.e. the component is too big!!

class MakeCurrencyOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popup_state: null,
    }

    this.clickCreateOrder = this.clickCreateOrder.bind(this)
    // console.log("MakeCurrencyOrder->constructor()", this.props.match.params.type, caseOptionBTClayerexchange, paths_URL, URL_)
  }

  displayErrorpopup(error = undefined) {
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

          <MakeCurrencyOrderLocation
          />

          <MakeCurrencyOrderNumbers/>
          <MakeCurrencyOrderChainPayment/>

          <button type="submit" id='currency-submit' onClick={(e) => this.clickCreateOrder(e)}>Submit</button>

        </form><br />


        {this.state.popup_state ?
          <p>{this.state.popup_state}</p>
          : null}
      </div>

    );
  }
  //_________________________________________________________________


  async clickCreateOrder(e) {
    e.preventDefault()


    // let [url_param_order_type_to_save, amount_s] = []

    // caseOptionBTClayerexchange === "makebuy" ? [url_param_order_type_to_save, amount_s] = ["buyorders", ["amount"]] :
    // caseOptionBTClayerexchange === "makesell" ? [url_param_order_type_to_save, amount_s] = ["sellorders", ["minamount", "maxamount"]] :
    // null

    // let amount_fields_obj = {}

    // for (const field of amount_s) {
    //   amount_fields_obj[field] = document.getElementById("form_id").elements[field].value
    // }

    // let btc_orderinfo = {
    //   chain: document.getElementById("form_id").elements["chain"].value,
    //   ...amount_fields_obj,
    //   rate: document.getElementById("form_id").elements["price"].value,
    //   expirydate: document.getElementById("form_id").elements["expirydate"].value,
    //   expirytime: document.getElementById("form_id").elements["expirytime"].value,
    //   payment: document.getElementById("form_id").elements["payment"].value,
    // }

    // let province_state

    // if(this.state.country == 'Canada') {
    //   province_state = document.getElementById("form_id").elements["province"].value
    // } else if (this.state.country == 'United States') {
    //   province_state = document.getElementById("form_id").elements["state"].value
    // }


    // let btc_orderinfo_location = {
    //   country: document.getElementById("form_id").elements["country"].value,
    //   province_state: province_state,
    // }



    // console.log(btc_orderinfo, btc_orderinfo_location, url_param_order_type_to_save)


    // let error = validateInputs({...btc_orderinfo, ...btc_orderinfo_location}) || validateExpiry(btc_orderinfo)

    // console.log("error======>>>>>>>", error)

    // error = parseInt(btc_orderinfo.minamount) > parseInt(btc_orderinfo.maxamount) && !error ? "Min Amount Cannot be superior than Max Amount, please edit, and resubmit." : error

    // if (error) return this.displayErrorpopup(error)



    // const hny_spm = document.getElementById("form_id").elements["hny_spm"].value

    // if (hny_spm != ""){
    //   const rand_delta = Number((Math.random() * 100).toFixed(2))
    //   const fake_api_delay = 900 + rand_delta
    //   setTimeout(()=>{
    //     this.setState({
    //       popup_state: "You have successfully made an order"
    //     })
    //     return
    //   },
    //   fake_api_delay)
    //   return
    // }

    // let response = await fetch(`/${url_param_order_type_to_save}/save`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify({...btc_orderinfo, ...btc_orderinfo_location})
    // })

    // console.log("server response status:", response.status)

    // switch (response.status) {
    //   case 200:
    //     this.setState({
    //       popup_state: "You have successfully made an order"
    //     })
    //     break;
    //   case 500:
    //     console.log(500)
    //     this.setState({
    //       popup_state: "An issue has occured, please try again later. A website maintainer is looking into the mater."
    //     })
    //     break;
    //   default:
    //     break;
    // }
    // let json_SRV = await response.json()
    // console.log("server response json:", json_SRV)

    console.log("sumit currency order")
  }

}

export default MakeCurrencyOrder