import './styles/HomeBannerCard.css'


class HomeBannerCard extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <React.Fragment>

        <div id='home-card'>
          <img src={this.props.icon_path} alt="" />
          <span>{this.props.text}</span>

        </div>
      </React.Fragment>
    )
  }
}

export default HomeBannerCard