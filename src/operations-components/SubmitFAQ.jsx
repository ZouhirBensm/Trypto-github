

class SubmitFAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {popup: undefined};
    this.submitFAQ = this.submitFAQ.bind(this)
  }

  submitFAQ = async (event) => {
    // console.log("event", event)
    console.log(this.props.title, this.props.inputs)


    if (!this.props.title || !this.props.inputs) {
      const popup = 'Title or input missing.'
      this.setState({popup: popup})
      return
    }


    let response;
    response = await fetch('/operations/create-faq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: this.props.title,
        inputs: this.props.inputs
      })
    })

    console.log('response: \n', response)
    this.setState({popup: undefined})

    const contentType = response.headers.get('Content-Type')
    console.log(contentType)
    
    let data
    if (contentType && contentType.includes('application/json')){
      data = await response.json()
    }
    
    if(response.status !== 200) {
      let err = 'Response not 200 and not in JSON format.'
      if(data) err =  data.error.message
      this.setState({popup: err})
      return
    }

    console.log(data)
    return this.setState({popup: data.message})

  }

  
  

  render() {

    return (
      <React.Fragment>
        <span id="popup">{this.state.popup}</span>
        <br />

        <button onClick={this.submitFAQ}>
          Submit
        </button>
      </React.Fragment>
    );
  }
}



export default SubmitFAQ;
