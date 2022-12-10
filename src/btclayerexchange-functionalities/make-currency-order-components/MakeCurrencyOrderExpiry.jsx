class MakeCurrencyOrderExpiry extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <React.Fragment>
        <label htmlFor="expirydate-select">Order Expiry Date</label>
        <input id="expirydate-select" type="date" name="expirydate" required defaultValue='2022-12-25' /><br />
  
        <label htmlFor="expirytime-select">Order Expiry Time</label>
        <input id="expirytime-select" type="time" name="expirytime" required defaultValue='08:00' /><br />
      </React.Fragment>
    )
  }
}

export default MakeCurrencyOrderExpiry