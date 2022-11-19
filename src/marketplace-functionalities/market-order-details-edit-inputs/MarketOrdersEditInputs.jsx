

function EditTitle(props) {
  let currentValue = props.curentValue;
  return (
    <input form="my_form" type="text" id="title-select" defaultValue={currentValue} name="title" required />
  )
}


function EditCategory(props) {
  let currentValue = props.curentValue;
  return (
    <select form="my_form" name="category" id="category-select" required defaultValue={currentValue}>
      <option value="Other">Other</option>
      <option value="Kitchen">Kitchen</option>
      <option value="Clothes">Clothes</option>
      <option value="Electronics">Electronics</option>
      <option value="Automobile">Automobile</option>
      <option value="Camping">Camping</option>
      <option value="Furniture">Furniture</option>
    </select>
  )
}



function EditPrice(props) {
  let currentValue = props.curentValue;
  return (
    // onChange={(e) => this.handleChange(e)}
    <input form="my_form" type="number" id="price-select" name="price" step="0.01" required defaultValue={currentValue} />
  )
}





function EditConversion(props) {
  let currentValue = props.curentValue;
  return (
    <React.Fragment>
      {/* onChange={(e) => this.handleChange(e)} */}
      <input form="my_form" type="number" id="conversion-select" name="conversion" step="0.01" required defaultValue={currentValue} />
      {/* <button onClick={(e) => { this.clickGetCryptoPrice(e) }}>Market</button> */}
    </React.Fragment>

  )
}






function EditPayment(props) {
  let currentValue = props.curentValue;
  let options = props.options
  return (
    // onChange={this.change}
    <select form="my_form" name="payment" id="payment-select" required defaultValue={currentValue}>
      <option value="">No Selection</option>
      {options}
    </select>
  )
}




function EditChain(props) {
  let currentValue = props.curentValue;
  return (
    // onChange={(e) => this.handleChange(e)}
    <select onChange={(e) => props.handleChange(e)} form="my_form" name="crypto" id="crypto-select" defaultValue={currentValue} required >
      <option value="Bitcoin Base Chain">Bitcoin Base Chain</option>
      <option value="Bitcoin Lightning">Bitcoin Lightning</option>
      <option value="Bitcoin Liquid">Bitcoin Liquid</option>
    </select>
  )
}


function EditExpiryTime(props) {
  let currentValue = props.curentValue;
  return (
    <React.Fragment>
      <input form="my_form" id="expirytime-select" type="time" name="expirytime" required defaultValue={currentValue} />
    </React.Fragment>
  )
}




function EditExpiryDate(props) {
  let currentValue = props.curentValue;
  return (
    <React.Fragment>
      <input form="my_form" id="expirydate-select" type="date" name="expirydate" required defaultValue={currentValue} />
    </React.Fragment>
  )
}




function EditDescription(props) {
  let currentValue = props.curentValue;
  return (
    <textarea form="my_form" name="description" id="description-select" defaultValue={currentValue} cols="30" rows="3" required></textarea>
  )
}



export default { EditDescription, EditExpiryDate, EditExpiryTime, EditChain, EditPayment, EditConversion, EditPrice, EditCategory, EditTitle};
