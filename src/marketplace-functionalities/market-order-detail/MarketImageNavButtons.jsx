
import './style/MarketImageNavButtons.css'

class MarketImageNavButtons extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }


  componentDidUpdate(){
    console.log("MarketImageNavButtons componentDidUpdate 🏎️")

    const buttonPrevious = document.querySelector('button#previous')
    const buttonNext = document.querySelector('button#next')

    if(this.props.scroll_number == 1) {
      buttonPrevious.style.opacity = '0.4'
      buttonPrevious.disabled = true;
    } else {
      buttonPrevious.style.opacity = 'unset'
      buttonPrevious.disabled = false;
    }

    if(this.props.scroll_number == this.props.last_scroll_number) {
      buttonNext.style.opacity = '0.4'
      buttonNext.disabled = true;
    } else {
      buttonNext.style.opacity = 'unset'
      buttonPrevious.disabled = false;
    }
  }

  // componentDidMount(){
  //   console.log("MarketImageNavButtons componentDidMount 🏎️")
  // }

  // componentWillUnmount(){
  //   console.log("MarketImageNavButtons componentWillUnmount 🔥")
  // }

  render(){

    // console.log("...", this.props.scroll_number, this.props.last_scroll_number)
    return (
      <React.Fragment>
        {/* style= {this.props.scroll_number == 1 ? {opacity: 0.4} : null} */}
        {/* disabled={(this.props.scroll_number == 1)} */}
        <button id='previous' className='image-nav' value={-1} onClick={(e)=>{
          e.preventDefault()
          this.props.scrollImage(e)
        }}>
          {/* Previous */}
          {/* <img src="/img/SVG/market/individual-article/nav-previous.svg" alt="" /> */}
        </button>

        {/* style= {this.props.scroll_number == this.props.last_scroll_number ? {opacity: 0.4} : null} */}
        <button id='next' className='image-nav' disabled={(this.props.scroll_number == this.props.last_scroll_number)} value={1} onClick={(e)=>{
          e.preventDefault()
          this.props.scrollImage(e)
        }}>
          {/* Next */}
          {/* <img src="/img/SVG/market/individual-article/nav-next.svg" alt="" /> */}
        </button>
      </React.Fragment>
    )
  }
}

export default MarketImageNavButtons