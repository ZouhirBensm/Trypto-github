console.log("socketio in the house!")


// $(document).ready(() => {
// })

// Get information from ejs pre-loaded template page
// var userIdA = document.getElementById("userId").innerHTML


// console.log("we got!", userIdB, orderId)

// Imporatant information to work with
// userId is pre loaded and retreived from the backend /Users/Zouhir/Documents/MERN/BlockchainMERN/server/server.js line 115: res.locals.userId = req.session.userId

// console.log("EJS page preloaded information: ", `domain_without_protocol: ${window.location.protocol}//${domain_without_protocol}`, {userId, userIdB, orderId})


// Instantiating a socket connection using TCP to the domain_without_protocol i.e. http://localhost:3000, with query params
console.log("/js/socketio.js: domain_without_protocol:", domain_without_protocol)

const socket = io(`${window.location.protocol}//${domain_without_protocol}`, { query: `userAId=${userId}&userBId=${userIdB}&orderId=${orderId}` });




// Retrieving HTML Elements needed
var msgBox = document.getElementById("msg-box")
var chatForm = document.getElementById("chatForm")
var chatInput = document.getElementById("chat-input")

var loggedInEmail = currentUserEmail
var loggedInUsername = currentUserName


// console.log("User that is currently logged in used for message author when submition of a new message: ", userId)

// ______________________________ SUBMIT ______________________________
// Submit message from the form
chatForm.addEventListener("submit", (e)=>{
  e.preventDefault()
  console.log("submit")
  // Content of the submission to the backend
  userSendObjectPackaged = {
    content: chatInput.value,
    msgAuthorId: userId,
    msgAuthorUsername: loggedInUsername,
    msgAuthorEmail: loggedInEmail,
    datetime: new Date(),
    orderId: orderId,
  }
  // console.log("Submited package: ", userSendObjectPackaged)
  
  // Triggering a "messaging" on the backend
  socket.emit("messaging", userSendObjectPackaged)
  // Reset the input field
  chatInput.value = ''
})
// ______________________________ SUBMIT ______________________________

// ______________________________ RETRIEVE BROADCAST ______________________________
// Processing the message that get "broadcasted" from the backend on "connection" event and on "messaging" event
// Process one message at a time
socket.on("broadcast", (SentObjectPackaged) => {
  console.log("\n\n\n\n\n___new message___\n\n\n\n")
  
  console.log("from the server SentObjectPackaged: ", SentObjectPackaged)

  // console.log("\nreceived from this sender: ", SentObjectPackaged.msgAuthorId, " supposed channelled with: ", userIdB)


  // Undefined for first load
  // Display message only if message destined to myself or if the message is authored as userIdB on the page
  // Double checking on the front end, emit is already filtered on the backend.
  if (SentObjectPackaged.msgAuthorId == userId | SentObjectPackaged.msgAuthorId == userIdB | SentObjectPackaged.msgAuthorId == undefined){
    // New message item
    var item = document.createElement("li")

    // Convert the Date time to 00:00 AM format
    const datetime = new Date(SentObjectPackaged.datetime);
    const timeString = datetime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const formattedTimeString = timeString.replace(/(\d{1,2}):(\d{2})\s(.*)/, function(_, hh, mm, a) {
      return `${hh}:${mm} ${a.toUpperCase()}`;
    });


  
    // Define HTML and add class if logged in user is the author.
    item.innerHTML = `
    <div class="message${window.utils.equalityCheck_LogInID_to_msgUserID(SentObjectPackaged.msgAuthorId, userId)}">

       <!-- <strong>
        ${SentObjectPackaged.msgAuthorUsername}
      </strong> -->
      <div class='content'>
        <span class='content'>${SentObjectPackaged.content}</span>
        <span class='time'>
          ${formattedTimeString}
        </span>
      </div>
    </div>
    `

    // Append item and scroll
    msgBox.appendChild(item)
    msgBox.scrollTo(0, msgBox.scrollHeight)
  }
})

// ______________________________ RETRIEVE BROADCAST ______________________________