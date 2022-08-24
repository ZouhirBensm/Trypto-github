// import React from 'react';
import './styles/MgtUser.css' 


class Profile extends React.Component {

  constructor(){
    super()
    this.state = {
    }
    this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
    this.handleDeleteMySubscription = this.handleDeleteMySubscription.bind(this)
  }

  async handleDeleteMySubscription(e){
    e.preventDefault()
    console.log("handleDeleteMySubscription")


    console.log("paypal_api_root: ", ENV.paypal_api_root, process.env.paypal_api_root)
    console.log("sessionUser: ", sessionUser.subscriptionID.paypal_subscriptionID)
    console.log("paypal_access_token: ", ENV.paypal_access_token, process.env.paypal_access_token)
    console.log("entire url post:\n", `${process.env.paypal_api_root}/billing/subscriptions/${sessionUser.subscriptionID.paypal_subscriptionID}/cancel`)

    let response = await fetch(`${process.env.paypal_api_root}/billing/subscriptions/${sessionUser.subscriptionID.paypal_subscriptionID}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${process.env.paypal_access_token}`,
        // 'Authorization': 'Basic ATXJhXxcZNV30C3S1vll7GE8VfNhZLnRfkz1dfS7ic1PTRQI8k7e8FwQWIOwoFBJs6nMM49JIVnESF_f:EMCZmiBejeSf5Hkik7HrtjZewPE3-5JCrjwkzWVZOEUw1jvzfg-3gBS6XKeg_vVhuIA00OEuLBvId8of'
        'Authorization': `Bearer A21AAJkruharCMNbZQWgxwOhJWjdr4GmTh0JpynOyE2gztLXSjMN5_i_DtsIqIYtt_YzwILVELfXHxQOXYDkG9vHbA93_sc6A`,
      },
      body: JSON.stringify({
        reason: "Not satisfied with the service EXAMPLE Zouhir",
      })
    })

    console.log("response!!\n ", response)

  }

  async handleProfileDeletion(e){
    e.preventDefault()
    const userId = document.getElementById("userId").innerHTML
    console.log("did it work?", userId)

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
      window.location.href = `${process.env.ROOT}?popup=${srv_.srv_}`;
    } else {
      throw new Error("Server was unable to delete the account.")
    }
  }


  render() {
    console.log("WOHOOOO!!!!", sessionUser)
    return (
      <div id="container-log-reg">
        <button type="submit" onClick={(e) => this.handleProfileDeletion(e)}>Delete Account</button>

        {
          sessionUser.subscriptionID ? 
          <button type="submit" onClick={(e) => this.handleDeleteMySubscription(e)}>Delete Subscription</button>
          :
          null
        }
      </div>
    );
  }
}

export default Profile