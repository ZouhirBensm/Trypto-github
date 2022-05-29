import React from 'react';
import './styles/MgtUser.css' 

class Profile extends React.Component {

  constructor(){
    super()
    this.state = {
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e){
    e.preventDefault()
    const userId = document.getElementById("userId").innerHTML
    console.log("did it work?", userId)
    console.log(userId)

    const response = await fetch(`${process.env.ROOT}/users/profile/delete/${userId}`, {
      method: 'DELETE',
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Accept': 'application/json'
      // },
      // body: JSON.stringify({
      //   email: document.getElementById("loginregister").elements[0].value,
      //   password: document.getElementById("loginregister").elements[1].value,
      // })
    })
    console.log(response)
    
    const srv_ = await response.json()
    console.log(srv_)

    if(response.status === 200){
      console.log("do we make it here?")
      // window.location.href = `${process.env.ROOT}/`;
    } else {
      throw new Error("Server was unable to delete the account.")
    }
  }


  render() {
    
    return (
      <div id="container-log-reg">
        <button type="submit" onClick={(e) => this.handleSubmit(e)}>Delete Account</button>
      </div>
    );
  }
}

export default Profile