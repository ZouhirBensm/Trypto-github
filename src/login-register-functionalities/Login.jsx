import React from 'react';
import './styles/LoginRegister.css' 

class Login extends React.Component {

  constructor(){
    super()
    this.state = {
      notification: null
    }
    this.functionneed = this.functionneed.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    // console.log(e.target.parentNode)
    // console.log(document.getElementById("loginregister").elements);
    // console.log(document.getElementById("loginregister").elements[0].value)
    // console.log(document.getElementById("loginregister").elements[1].value)

    fetch(`${process.env.ROOT}/users/login`, {
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
    .then(response => {
      // console.log("api ress: ", response); 
      return response.json()
    })
    .then(data => {
      console.log(data.data[0])
      if(data.data[0] === "success"){
        window.location.href = `${process.env.ROOT}/`;
      } else {
        this.setState({
          notification: data.data,
        })
      }
      // console.log("server responses with: ", data)
    })
  }

  functionneed(){}

  render() {

    const notifyDisplays = this.state.notification?.map((notification, index) => {
      return <div key={index}>{notification}</div>
    })

    console.log(notifyDisplays)
    
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
      </div>
    );
  }
}

export default Login