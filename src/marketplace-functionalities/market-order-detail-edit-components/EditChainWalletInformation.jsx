class EditChainWalletInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: null
    }
    this.onChange = this.onChange.bind(this)
    this.setOptions = this.setOptions.bind(this)
  }

  componentDidMount() {
    this.setOptions(this.props.chain)
  }

  setOptions(_chain) {
    let options
    let tag_options_arr_data = []

    if (_chain == "Bitcoin Base Chain") {
      tag_options_arr_data = ["Wallet1", "Wallet2", "Wallet3", "Wallet4"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_chain == "Bitcoin Lightning") {
      tag_options_arr_data = ["Wallet5", "Wallet6", "Wallet7", "Wallet8"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else if (_chain == "Bitcoin Liquid") {
      tag_options_arr_data = ["Wallet9", "Wallet10", "Wallet11", "Wallet12"]
      options = tag_options_arr_data.map((el, i) => <option key={i} value={el}>{el}</option>);
    }
    else { }

    this.setState({
      options: options
    }, ()=>{

      let payment_select = document.getElementById("payment-input")
      let options_object = [...payment_select.options].map((option, index)=>{
        return {index: index, value: option.value}
      })
      console.log(options_object)
      const found = options_object.find(option_object => option_object.value == this.props.payment)

      if (!found){
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

  // TODO log in heroku and check charges
  render() {

    return (
      <React.Fragment>
        <div>EditChainWalletInformation...</div>
        <form className="form" id="form_id">

          <label htmlFor="chain-input">Chain Network</label>
          <select name="chain" id="chain-input" defaultValue={this.props.chain} onChange={(e) => {
            this.onChange(e);
          }}>
            <option value="">No Selection</option>
            <option value="Bitcoin Base Chain">Bitcoin Base Chain</option>
            <option value="Bitcoin Lightning">Bitcoin Lightning</option>
            <option value="Bitcoin Liquid">Bitcoin Liquid</option>
          </select> <br />



          <label htmlFor="payment-input">Payment on</label>
          <select name="payment" id="payment-input" defaultValue={this.props.payment} >
            <option value="">No Selection</option>
            {this.state.options}
          </select> <br />
        </form>


        <button onClick={(e) => {
          this.props.handleToogleEdit(undefined)
        }}>Revert</button>
      </React.Fragment>
    )
  }
}

export default EditChainWalletInformation