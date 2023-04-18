import "./style/NavigationNew.css" 

class NavigationNew extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    // console.log("--->", this.props.order_type)
  }

  render(){
    const order_type = this.props.order_type
    return (
      <React.Fragment>
      <nav id="navigation">
        <a href="/marketplace/makesell">Add Article</a>
        <a className={order_type === 'sellordersdata'? 'selected' : null} href="/marketplace/sellordersdata">Explore Market</a>
        <a className={order_type === 'allmyorders'? 'selected' : null} href="/marketplace/allmyorders">My Posts</a>
      </nav>
      </React.Fragment>
    )
  }
}

export default NavigationNew