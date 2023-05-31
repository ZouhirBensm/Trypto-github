import './style/PriceToogler.css'


class PriceToogler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false
    }

    this.handleCheck = this.handleCheck.bind(this)
    this.price_raw = this.props.price / this.props.conversion
    this.price_sat = Math.trunc(this.price_raw * 1000000000)
  }


  handleCheck(){
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {

    // console.log(this.state.checked)

    const lr = this.state.checked ? "flex-start": "flex-end"

    return (
      <React.Fragment>
        <div id="toogler1">

          <input type="checkbox" id={`id-${this.props.order_id}`} className="checkbox" checked={this.state.checked} onChange={this.handleCheck}/>

          <label style={{justifyContent: lr}} htmlFor={`id-${this.props.order_id}`} className="switch">
            <span>{this.state.checked ? `${this.price_sat.toLocaleString()} Satoshis` : this.props.price}</span>
          </label>



        </div>
      </React.Fragment>
    )
  }

}

export default PriceToogler