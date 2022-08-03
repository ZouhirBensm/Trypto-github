// import React from 'react';

class MessageTable extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){

    const convosRow = this.props.convos.map((convo, i) => {
      return <MessageRow 
      key={i} 
      keyy={i} 
      convo={convo}
      />
    })

    // console.log("done execution we got: ", convosRow)
    // console.log("Does Not Require Keys: ", ordersRow)

    return(
      <table className="bordered-table">
        {/* <thead>
          <tr>
            <th>Order _id</th>
            <th>Posted by</th>
            <th>Date Posted</th>
            <th>Crypto</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Expiry</th>
            <th>Payment</th>
            <th>Deal</th>
          </tr>
        </thead> */}
        <tbody>
          {convosRow}
        </tbody>
      </table>
    );
  }
}


class MessageRow extends React.Component {
  constructor(props){
    super(props)
    // this.state = {

    // }
    
    // this.deal = this.deal.bind(this)
    this.userId = document.getElementById("userId").innerHTML
  }

  // deal(order, e){
  //   e.preventDefault()
  //   // console.log(`/messaging?orderId=${order._id}&userIdB=${order.userid._id}`)
  //   window.location.href = `/messaging?orderId=${order._id}&userIdB=${order.userid._id}`
  // }


  render(){
    const convo = this.props.convo;

    const communicating_with_ID = convo.protagonists.filter(protagonist => {return protagonist != userId})

    const most_recent_convo_text = convo.msg_stream.at(-1).text
    const most_recent_convo_sender_email = convo.msg_stream.at(-1).sender.email


    console.log(`row ${this.props.keyy} executing: `, convo)

    // console.log("Require Keys: ", display_editing)
    return(
      <tr>
        {/* TODO #85 Add Profile pictures to users */}
        <td id="img-profile">{communicating_with_ID}</td>
        <td id="comm-with-ID" style={{"display": "none"}}>| Comunicating with: {communicating_with_ID}</td>
        <td id="msg-notifications-#">| #</td>
        <td id="last-sender-email">| From: {most_recent_convo_sender_email}</td>
        <td id="recent-msg">| Said: {most_recent_convo_text}</td>

        {/* 
        <td id="img-profile"></td>
        <td id="new-msgs">ok</td>
        <td id="recent-msg">ok</td> */}
      </tr>
    );
  }
}

export default MessageTable