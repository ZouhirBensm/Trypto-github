import BITCOIN_CHAINS_WALLETS from '../../../full-stack-libs/Types/BitcoinChainsWallets';
import './style/ChainWalletInformation.css'

class ChainWalletInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // componentDidUpdate(){
  //   console.log(this.props.chain)
  // }

  render() {


    let chain_logo_img_src;

    switch (this.props.chain) {
      case BITCOIN_CHAINS_WALLETS.BITCOIN_LIGHNING.name:
        chain_logo_img_src = '/img/PNG/chain-logo/lightning.png'
        break;
      case BITCOIN_CHAINS_WALLETS.BITCOIN_LIQUID.name:
        chain_logo_img_src = '/img/PNG/chain-logo/liquid.png'
        break;
      case BITCOIN_CHAINS_WALLETS.BITCOIN_BASE_CHAIN.name:
        chain_logo_img_src = '/img/PNG/chain-logo/bitcoin.png'
        break;
      default:
        break;
    }



    return (
      <React.Fragment>

        <div className="gray-box">


          <img src={chain_logo_img_src} alt="" />

          {/* <h2>Chain</h2> */}
          <div id='chain'>{this.props.chain}</div>

          {this.props.isSuperUser ?
              <button className="edit-button" onClick={(e) => {
                this.props.handleToogleEdit("ChainWalletInformation")
              }}>
                <img src="/img/SVG/market/individual-article/edit.svg" alt="" />
              </button>
            :
            null
          }

          <br />

          <h2>Payment</h2>
          <div id='payment'>{this.props.payment}</div> <br />

        </div>




      </React.Fragment>
    )
  }
}

export default ChainWalletInformation