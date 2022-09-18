// import React from 'react';
import './styles/MgtUser.css' 

class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      notification: [],
    }
    // this.functionneed = this.functionneed.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.popup = null
    console.log(this.props.loginTo)
    // this.functionneed()
  }
  
  // functionneed(){
  //   const params = new Proxy(new URLSearchParams(window.location.search), {
  //     get: (searchParams, prop) => searchParams.get(prop),
  //   });
  //   // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  //   let value = params.popup; // "some_value"
  //   console.log(value)
  //   this.popup = value
  // }

  async handleSubmit(e){
    e.preventDefault()
    // console.log(e.target.parentNode)
    // console.log(document.getElementById("loginregister").elements);
    // console.log(document.getElementById("loginregister").elements[0].value)
    // console.log(document.getElementById("loginregister").elements[1].value)

    let response = await fetch(`${this.props.loginTo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: document.getElementById("loginregister").elements[0].value,
        password: document.getElementById("loginregister").elements[1].value,
      })
    })

    let data = await response.json()

    console.log(response, data)


    if (response.status == 200) {
      window.location.href = `/?popup=You have successfully logged in!`;
    } else {
      if(data.error){
        this.setState({
          notification: data.error.message,
        })
      } else {
        throw new Error(`Front end does not support failed POST ${this.props.loginTo} server response`)
      }
    }
  }

  render() {

    console.log(this.popup)
    const notifyDisplays = this.state.notification.map((notification, index) => {
      return <div key={index}>{notification}</div>
    })

    // console.log(notifyDisplays)
    
    return (
      <div id="container-log-reg">
        <form id="loginregister" className="form">
          <h3>Login</h3>
          <label>Email</label>
          <input type="text" name="email"/> 
          <label>Password</label>
          <input type="text" name="password"/> 
          <button type="submit" onClick={(e) => this.handleSubmit(e)}>Login</button>
        </form>
        {/* display the notification from the server here! */}
        { notifyDisplays }

        {this.popup?
        <p>{this.popup}</p>
        :null}

      </div>
    );
  }
}

export default Login