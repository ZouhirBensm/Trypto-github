class DowngradeToFree extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    // console.log(this.props.clickable)
  }
  render(){
    return (
      <React.Fragment>
        <div className="main-card">
          <button disabled={this.props.clickable}>FREE</button>
        </div>
      </React.Fragment>
    )
  }
}

export default DowngradeToFree