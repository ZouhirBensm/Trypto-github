console.log("socketio in the house!")
// $(document).ready(() => {
  var userIdB = document.getElementById("userIdB").innerHTML
  var orderId = document.getElementById("orderId").innerHTML

  console.log("good", {domain, userId, userIdB, orderId})
  // const protocol = /^(\w+)\:/.exec(domain)


  // console.log(protocol)
  
  // wsDomain = domain.replace(protocol[1], 'wp')
  // console.log(wsDomain, typeof wsDomain)

  // const socket = io()
  const socket = io(`${domain}`, { query: `userAId=${userId}&userBId=${userIdB}&orderId=${orderId}` });


  var msgBox = document.getElementById("msg-box")
  var chatForm = document.getElementById("chatForm")
  var chatInput = document.getElementById("chat-input")
  // Comes from component MsgInputSubmit that retrieves the parameter that it got served from the server. That parameter represents the current logged in user.
  var chatUserId = document.getElementById("chat-user-id")
  var chatUserEmail = document.getElementById("chat-user-email")

  chatForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    console.log("submit")
    userSendObjectPackaged = {
      content: chatInput.value,
      chatUserId: chatUserId.value,
      chatUserEmail: chatUserEmail.value,
      datetime: new Date(),
      orderId: orderId,
    }
    console.log("Submited: ", userSendObjectPackaged)
    socket.emit("messaging", userSendObjectPackaged)
    chatInput.value = ''
  })

  socket.on("broadcast", (userSendObjectPackaged) => {
    console.log("The server userSendObjectPackaged: ", userSendObjectPackaged)
    console.log("received from this sender: ", userSendObjectPackaged.chatUserId, "channelled with: ", userIdB)

    // undefined for first load, and display message only if message destined to myself or to the person set up as userIdB on the page
    if (userSendObjectPackaged.chatUserId == userId | userSendObjectPackaged.chatUserId == userIdB | userSendObjectPackaged.chatUserId == undefined){
      var item = document.createElement("li")
      item.innerHTML = `<strong class="message${equalityCheck_LogInID_to_msgUserID(userSendObjectPackaged.chatUserId)}">${userSendObjectPackaged.chatUserEmail}</strong>: ${userSendObjectPackaged.content}`
      msgBox.appendChild(item)
      msgBox.scrollTo(0, msgBox.scrollHeight)
    }
  })

  function equalityCheck_LogInID_to_msgUserID(_id) {
    return _id === chatUserId.value ? " current-user": ""
  }
// document.addEventListener("DOMContentLoaded", () => {
// })
// })