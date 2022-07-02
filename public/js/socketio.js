console.log("socketio in the house!")
// $(document).ready(() => {
  console.log("within DOMContentLoaded")
  const socket = io()

  var msgBox = document.getElementById("msg-box")
  var chatForm = document.getElementById("chatForm")
  var chatInput = document.getElementById("chat-input")
  // Comes from component MsgInputSubmit that retrieves the parameter that it got served from the server. That parameter represents the current logged in user.
  var chatUserId = document.getElementById("chat-user-id")

  chatForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    console.log("submit")
    userSendObjectPackaged = {
      content: chatInput.value,
      chatUserId: chatUserId.value,
      datetime: new Date(),
    }
    console.log(userSendObjectPackaged)
    socket.emit("messaging", userSendObjectPackaged)
    chatInput.value = ''
  })

  socket.on("broadcast", (userSendObjectPackaged) => {
    console.log("The server broadcasted to every socket this msg: ", userSendObjectPackaged.content)
    var item = document.createElement("li")
    item.innerHTML = `<div class="message${equalityCheck_LogInID_to_msgUserID(userSendObjectPackaged.chatUserId)}">${userSendObjectPackaged.content}</div>`
    msgBox.appendChild(item)
    msgBox.scrollTo(0, msgBox.scrollHeight)
  })

  function equalityCheck_LogInID_to_msgUserID(_id) {
    return _id === chatUserId.value ? " current-user": ""
  }
// document.addEventListener("DOMContentLoaded", () => {
// })
// })