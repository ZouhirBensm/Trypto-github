import './styles/FAQItem.css'

class FAQItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    return (
      <React.Fragment>
        <a href={this.props.link}>
          <span>{this.props.title}</span>
        </a>
      </React.Fragment>

    );
  }

}


export default FAQItem