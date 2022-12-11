class MakeCurrencyOrderChainPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor="chain-select">BTC Type/Chain</label>
        <select name="chain" id="chain-select" required>
          <option value="Bitcoin Base Chain" defaultValue>Bitcoin Base Chain</option>
          <option value="Bitcoin Lightning">Bitcoin Lightning</option>
          <option value="Bitcoin Liquid">Bitcoin Liquid</option>
        </select><br />
      </React.Fragment>
    )
  }
}

export default MakeCurrencyOrderChainPayment