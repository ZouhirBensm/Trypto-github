class MarketImageNavButtons extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){

    // console.log("...", this.props.scroll_number, this.props.last_scroll_number)
    return (
      <React.Fragment>
        <div>MarketImageNavButtons...</div>


        <button disabled={(this.props.scroll_number == 1)} value={-1} onClick={(e)=>{
          e.preventDefault()
          this.props.scrollImage(e)
        }}>Previous</button>

        <button disabled={(this.props.scroll_number == this.props.last_scroll_number)} value={1} onClick={(e)=>{
          e.preventDefault()
          this.props.scrollImage(e)
        }}>Next</button>
      </React.Fragment>
    )
  }
}

export default MarketImageNavButtons