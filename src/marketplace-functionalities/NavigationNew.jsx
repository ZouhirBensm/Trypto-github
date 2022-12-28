import "./style/NavigationNew.css" 

class NavigationNew extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <React.Fragment>
      <nav id="navigation">
        <a href="/marketplace/makesell">Create +</a>
        <a href="/marketplace/sellordersdata">All</a>
        <a href="/marketplace/allmyorders">My</a>
      </nav>
      </React.Fragment>
    )
  }
}

export default NavigationNew