import '../style/reactDivMobile.css'
import './styles/Contact.css'
import OnPageFooter from '../generic-components/OnPageFooter';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      loading: false,
      popup: undefined
    };

    this.submitRef = React.createRef();
    this.honeyRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    this.submitRef.current.disabled = true
    const rand_delta = Number((Math.random() * 100).toFixed(2))
    const fake_delay = 2000 + rand_delta

    setTimeout(() => {
      this.submitRef.current.disabled = false
    }, fake_delay)

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ loading: true })
    const popupTimeout = 6000

    console.log('=>this.honeyRef.current.value:\n', this.honeyRef.current.value)
    
    // If robot filled honey exit!
    if (this.honeyRef.current.value !== "") {
      
      console.log('DONT FETCH')
      const fake_success_message = "Successfully sent message"

      return this.setState({
        popup: fake_success_message,
        loading: false
      }, () => { setTimeout(() => { this.setState({ popup: undefined }) }, popupTimeout) })
    }

    console.log('FETCH')

    let response
    response = await fetch('/contact/receive-contact-information', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        message: this.state.message,
        hny_spm: !!this.honeyRef.current.value
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
      if (data) this.setState({ popup: data.message, loading: false }, () => { setTimeout(() => { this.setState({ popup: undefined }) }, popupTimeout) })
      return false
    }

    return this.setState({
      popup: data.message,
      loading: false
    }, () => { setTimeout(() => { this.setState({ popup: undefined }) }, popupTimeout) })

  }

  render() {
    return (
      <React.Fragment>
        <div id='contact-page'>
          <h1>Contact</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              <span>
                Email:
              </span>
              <input placeholder='Place your email' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </label>
            <label>
              <span>
                Message:
              </span>
              <textarea rows={5} placeholder='Place your message' name="message" value={this.state.message} onChange={this.handleChange} required />
            </label>

            {this.state.loading ? <div className="spinner"></div> :
              <React.Fragment>
                {this.state.popup ? <span id="popup">{this.state.popup}</span> : null}
                <input ref={this.submitRef} type="submit" value="Submit" />
              </React.Fragment>
            }


            <input ref={this.honeyRef} type="text" name="hny_spm" />

          </form>

        </div>
        <OnPageFooter />
      </React.Fragment>
    );
  }
}

const element = <Contact />;

ReactDOM.render(element, document.getElementById('react-div'));

export default Contact
