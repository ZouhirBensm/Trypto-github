import '../style/reactDivMobile.css'
import './styles/Contact.css'


class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '', 
      message: '',
      loading: false,
      popup: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  async handleSubmit(event) {
    event.preventDefault();

    const popupTimeout = 6000

    this.setState({loading: true})

    let response
    response = await fetch('/contact/receive-contact-information', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        message: this.state.message
      })
    })

    const contentType = response.headers.get('Content-Type')
    console.log(contentType)

    let data
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
      console.log('\n', data)
    }

    if (response.status !== 200) {
      if (data) this.setState({ popup: data.message, loading: false }, ()=>{setTimeout(()=>{this.setState({popup: undefined})}, popupTimeout)})
      return false
    }

    return this.setState({
      popup: data.message,
      loading: false
    },()=>{setTimeout(()=>{this.setState({popup: undefined})}, popupTimeout)})

  }

  render() {
    return (
      <React.Fragment>
        <h1>Contact Page</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
          </label>
          <label>
            Message:
            <textarea name="message" value={this.state.message} onChange={this.handleChange} required />
          </label>

          { this.state.loading ? <div className="spinner"></div> : 
          <React.Fragment>
            {this.state.popup ?  <span id="popup">{this.state.popup}</span> : null }
            <input type="submit" value="Submit" /> 
          </React.Fragment>
          }

        </form>
      </React.Fragment>
    );
  }
}

const element = <Contact />;

ReactDOM.render(element, document.getElementById('react-div'));

export default Contact
