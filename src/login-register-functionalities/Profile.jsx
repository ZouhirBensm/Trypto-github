// import React from 'react';
import './styles/MgtUser.css' 


class Profile extends React.Component {

  constructor(){
    super()
    this.state = {
    }
    this.handleProfileDeletion = this.handleProfileDeletion.bind(this)
    this.handleDeleteMySubscription = this.handleDeleteMySubscription.bind(this)
    this.returnFetchAuthorizationString = this.returnFetchAuthorizationString.bind(this)
  }

  // TODO refactor and do it all on the back end!!!!!
  async returnFetchAuthorizationString(e){
    let stringToConvert = `${ENV.paypal_client_id}:${ENV.paypal_secret}`
    
    // Buffer.from("Hello World").toString('base64')
    let BASE64_paypal = btoa(stringToConvert)

    let Authorization_string_for_fetch = `Basic ${BASE64_paypal}`

    console.log(`${ENV.paypal_client_id}:${ENV.paypal_secret}` , " to ", Authorization_string_for_fetch)

    return Authorization_string_for_fetch
  }

  async handleDeleteMySubscription(e){
    e.preventDefault()
    console.log("handleDeleteMySubscription")


    let Authorization_string_for_fetch = await this.returnFetchAuthorizationString()
    console.log("in handleDeleteMySubscription", Authorization_string_for_fetch)

    // let response1 = await fetch(`${ENV.paypal_api_root}/oauth2/token`, {
    //   body: "grant_type=client_credentials",
    //   headers: {
    //     Authorization: "Basic QVRYSmhYeGNaTlYzMEMzUzF2bGw3R0U4VmZOaFpMblJma3oxZGZTN2ljMVBUUlFJOGs3ZThGd1FXSU93b0ZCSnM2bk1NNDlKSVZuRVNGX2Y6RU1DWm1pQmVqZVNmNUhraWs3SHJ0alpld1BFMy01SkNyandreldWWk9FVXcxanZ6ZmctM2dCUzZYS2VnX3ZWaHVJQTAwT0V1TEJ2SWQ4b2Y=",
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: "POST"
    // })

    let response1 = await fetch(`${ENV.paypal_api_root}/oauth2/token`, {
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `${Authorization_string_for_fetch}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })

    let jjson = await response1.json()
    


    console.log("response1!!\n ", response1, "jjson", jjson.access_token)

    // console.log("paypal_api_root: ", ENV.paypal_api_root, process.env.paypal_api_root)
    // console.log("sessionUser: ", sessionUser.subscriptionID.paypal_subscriptionID)
    // console.log("paypal_access_token: ", ENV.paypal_access_token, process.env.paypal_access_token)
    // console.log('Authorization: ', `Bearer ${process.env.paypal_access_token}`)
    // console.log("paypal_client_id: ", ENV.paypal_client_id)
    // console.log("paypal_secret: ", ENV.paypal_secret)

    // console.log("entire url post:\n", `${process.env.paypal_api_root}/billing/subscriptions/${sessionUser.subscriptionID.paypal_subscriptionID}/cancel`)

    // let response = await fetch(`${process.env.paypal_api_root}/billing/subscriptions/${sessionUser.subscriptionID.paypal_subscriptionID}/cancel`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 'Accept': 'application/json',
    //     'Authorization': `Bearer ${process.env.paypal_access_token}`,
    //     // 'Authorization': `Basic ${ENV.paypal_client_id}:${ENV.paypal_secret}`,
    //   },
    //   body: JSON.stringify({
    //     reason: "Not satisfied with the service EXAMPLE Zouhir",
    //   })
    // })

    // console.log("response!!\n ", response)


    console.log("paypal_api_root: ", ENV.paypal_api_root, process.env.paypal_api_root)
    console.log("sessionUser: ", sessionUser.subscriptionID.paypal_subscriptionID)
    console.log("jjson.access_token: ", jjson.access_token)
    console.log('Authorization: ', `Bearer ${jjson.access_token}`)
    // console.log("paypal_client_id: ", ENV.paypal_client_id)
    // console.log("paypal_secret: ", ENV.paypal_secret)

    console.log("entire url post:\n", `${process.env.paypal_api_root}/billing/subscriptions/${sessionUser.subscriptionID.paypal_subscriptionID}/cancel`)

    let response = await fetch(`${process.env.paypal_api_root}/billing/subscriptions/${sessionUser.subscriptionID.paypal_subscriptionID}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        'Authorization': `Bearer ${jjson.access_token}`,
        // 'Authorization': `Basic ${ENV.paypal_client_id}:${ENV.paypal_secret}`,
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
          <div>
            <button type="submit" onClick={(e) => this.handleDeleteMySubscription(e)}>Delete Subscription</button>
            <button type="submit" onClick={(e) => this.returnFetchAuthorizationString(e)}>returnFetchAuthorizationString</button>
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default Profile