class DowngradeToFree extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    // console.log(this.props.clickable)
    this.downgradeToFree = this.downgradeToFree.bind(this)
  }

  downgradeToFree(){
    const onPageUnsubButton = document.getElementById("onpage-unsubscirbe-button")

    console.log(onPageUnsubButton)

    if(!onPageUnsubButton) {
    // if(true) {
      const msg = "Button to unsubscribe was not identifiyed on this page!"
      this.props.setpopups(msg)
      return
    }

    onPageUnsubButton.click();
    return
  }


  render(){
    return (
      <React.Fragment>
        <div className="main-card">
          <button disabled={this.props.clickable} onClick={this.downgradeToFree}>FREE</button>
        </div>
      </React.Fragment>
    )
  }
}

export default DowngradeToFree