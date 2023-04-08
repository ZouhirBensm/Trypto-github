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
        <a href="/marketplace/makesell">Add Article</a>
        <a href="/marketplace/sellordersdata">Explore Market</a>
        <a href="/marketplace/allmyorders">My Posts</a>
      </nav>
      </React.Fragment>
    )
  }
}

export default NavigationNew