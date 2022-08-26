// import React from 'react';
import './styles/MgtUser.css' 


class Profile extends React.Component {

  constructor(){
    super()
    this.state = {
    }
    this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
    this.paypalUnSub = this.paypalUnSub.bind(this)
  }


  async paypalUnSub(e){
    console.log("paypal unsub!")
    let response = await fetch(`${process.env.ROOT}/paypal/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        reason: "test_reason",
      })
    })
    console.log("response for paypalUnSub", response)
  }

  

  async handleProfileDeletion(e){
    e.preventDefault()
    const userId = document.getElementById("userId").innerHTML
    console.log("in handleProfileDeletion(), userId?", userId)

    const response = await fetch(`${process.env.ROOT}/users/profile/delete/${userId}`, {
      method: 'DELETE',
    })
    console.log(response)
    
    const srv_ = await response.json()
    console.log(srv_)

    if(response.status === 200){
      console.log("do we make it here?")
      window.location.href = `${process.env.ROOT}?popup=${srv_.srv_}`;
    } else {
      throw new Error("Server was unable to delete the account.")
    }
  }


  render() {
    console.log("sessionUser!!!! ", sessionUser)
    return (
      <div id="container-log-reg">
        <button type="submit" onClick={(e) => this.handleProfileDeletion(e)}>Delete Account</button>

        {
          sessionUser.subscriptionID ? 
          <div>
            <button type="submit" onClick={(e) => this.paypalUnSub(e)}>Unsubscribe</button>
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default Profile