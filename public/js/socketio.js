// $(document).ready(() => {
  console.log("socketio in the house!")
  const socket = io()

  var msgBox = document.getElementById("msg-box")
  var chatForm = document.getElementById("chatForm")
  var chatInput = document.getElementById("chat-input")

  chatForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    console.log("submit")
    console.log(chatInput.value)
    socket.emit("messaging", chatInput.value)
    chatInput.value = ''
  })

  socket.on("broadcast", (msg) => {
    console.log("The server broadcasted to every socket this msg: ", msg.content)
    var item = document.createElement("li")
    item.textContent = msg.content
    msgBox.appendChild(item)
    msgBox.scrollTo(0, msgBox.scrollHeight)
  })
document.addEventListener("DOMContentLoaded", () => {
})
// })