const Message = require('../../models/messaging-models/Message')
// const mongoose = require('mongoose');

const ENV = require('../../config/base')
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId; 
const uri = ENV.database_link;
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// More resources
// https://socket.io/how-to/use-with-express-session


let chatControllers = (io) => {
  // ______________________________________________________________________
  // Runs on every 'connection'


  // CONNECT client calls io() i.e. upon loading the socketio.js script on the front end, i.e. accessing the chat UI
  io.on("connection", async socket =>{

    console.log("\n\n\n\n\n____'connection' EVENT____\n\n\n\n\n")

    // Actual Session
    console.log("\n\nActual Session wrapped in socketIO:\n\n", socket.request.session);
    
    // Connection Socket IO Query Data
    const userAId = socket.request._query['userAId']
    const userBId = socket.request._query['userBId']
    const orderId = socket.request._query['orderId']
    
    // Current Socket ID
    const sckIdA = socket.id

    console.log(`\n\nInfos sent from front end socket io connection query\norderId: ${orderId}\nuser A: (id: ${userAId}, socketID: ${sckIdA})\nuser B: (id: ${userBId}, socketID: Determined in messaging event)\n\n`);


    // Connected Sockets to the socket server instance
    var srvSockets = io.sockets.sockets

    // Retrive the sessions
    let sessions
    try {
      await mongodbClient.connect();


      // might not need the let TODO
      let sessionCollection = mongodbClient.db(ENV.database_name).collection("sessions")
      all_sessions = sessionCollection.find()
      sessions = await all_sessions.toArray()

      console.log("\n\nSessions collection:\n\n", sessions)
      

      for(let session of sessions) {
        // Identification of my session, if any
        // Identification comparision between the DB Collection & the socket session linkage made in the ioServer.js file 
        if (session.session.userId && session.session.userId.toString() == socket.request.session.userId) {

          // When my session is found, if any. Add the socket ID, and a appended user B the communications are attended to, to a socket field.
          // await does have an effect because without it would go 1,2,3,4, then back to resolving the promise, but at that point the mongo connection would be closed, thus throw an error.
          // With await the promise is resolved, then proceeds to 1,2,3,4
          let my_session_entry = await sessionCollection.findOneAndUpdate({"session.userId": ObjectId(socket.request.session.userId)}, {$set: {"session.socket.id": socket.id, "session.socket.appendedUserB": userBId}}, { upsert: true, new: true })

          console.log("\nPromise resolved of a my connected session socket thread instance:\n", my_session_entry.value)
          // 1
        }
        // 2
      }
      // 3
    } catch (e) {
        console.error(e);
    } finally {
      // 4
      await mongodbClient.close();
    }




    // Compute all connected Sockets
    let connected_sockets = []

    for (const key of srvSockets.keys()) {
      // console.log(key);
      connected_sockets.push(key)
    }

    // Array of Socket ID's connected Array<String>
    console.log("\n\nArray of Connected socket ID's:\n\n", connected_sockets);
    

    // Query the messages DB, to see if any entry with BOTH protagonists, if any.
    // Populate with sender information, because will be needed
    let message_entry_with_both_protagonists = await Message.find({$and: [
      {protagonists: {$elemMatch: {"$in": [userAId]}}},
      {protagonists: {$elemMatch: {"$in": [userBId]}}}
    ]}).populate("msg_stream.sender")

    console.log("\n\nAny found entry of the the 2 protagonist's in the messages DB?:\n")
    
    if(message_entry_with_both_protagonists[0]){
      console.log("\nA: YES\n")
      console.log("Found entry:\n\n", message_entry_with_both_protagonists[0])

      // Loop through the message.msg_stream to emit it on the connected socket to display past conversation.
      message_entry_with_both_protagonists[0].msg_stream.forEach(msg => {
        const format_for_UI_object = {
          content: msg.text,
          chatUserId: msg.sender._id,
          chatUserEmail: msg.sender.email,
          datetime: msg.postedDate
        }
        // TODO
        socket.emit("broadcast", format_for_UI_object)
      });
    } else {
      console.log("\nA: NO\n")
    }



    // ______________________________________________________________________
    // DISCONNECT client page reloads or exits (because io() looses the connection?)
    socket.on("disconnect", async () => {
      console.log("\n\n\n\n\n____'disconnect' EVENT____\n\n\n\n\n")

      // Re-query the sessions
      try {
        await mongodbClient.connect();
        sessionCollection = mongodbClient.db(ENV.database_name).collection("sessions")
        all_sessions = sessionCollection.find()
        sessions = await all_sessions.toArray()

        console.log("\n\nSessions collection:\n\n", sessions)
        
        // Identify my session and de-append the entire socket field as user exits
        let mongo_update_ret_obj = await sessionCollection.updateOne({"session.userId": ObjectId(socket.request.session.userId)}, {$unset: {"session.socket":1}});

        console.log("\nPromise return resolved value for de-appending the socket:\n", mongo_update_ret_obj)

      } catch (e) {
        console.error(e);
      } finally {
        // Close client
        await mongodbClient.close();
      }
    });

    // ______________________________________________________________________
    // End 'disconnect'


    // ______________________________________________________________________
    socket.on("messaging", async (userSendObjectPackaged)=>{

      console.log("\n\n\n\n\n____'messaging' EVENT____\n\n\n\n\n")

      // Query the messages DB, to see if any entry with BOTH protagonists, if any.
      let message_entry_with_both_protagonists = await Message.find({$and: [
        {protagonists: {$elemMatch: {"$in": [userAId]}}},
        {protagonists: {$elemMatch: {"$in": [userBId]}}}
      ]})

      console.log("\n\nAny found entry of the the 2 protagonist's in the messages DB?:\n")

      // Scenario A: A discussion already exists between both protagonists:
      // We ADD the message to the msg_stream between protagonists
      if (message_entry_with_both_protagonists[0]){
        console.log("\nA: YES\n")
        console.log("Found entry:\n\n", message_entry_with_both_protagonists[0])
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        Message.findOneAndUpdate( {
          _id: message_entry_with_both_protagonists[0]._id,
        }, {
          "$push": { msg_stream: [{
            text: userSendObjectPackaged.content,
            sender: userAId,
            receiver: userBId,
            postedDate: userSendObjectPackaged.datetime
          }] }
        }, options, (error, new_message_stream_array) => {
          if(error) {console.error(error)} 
          console.log("\n\nAdded a msg to msg_stream, new msg_stream length is: ", new_message_stream_array.msg_stream.length)     
        })
      // Scenario B: No discussion already exists between both protagonists
      // We CREATE A message entry for both protagonists
      } else {
        console.log("\nA: NO\n")
        Message.create({
          protagonists: [userAId, userBId],
          msg_stream: [{
            text: userSendObjectPackaged.content,
            sender: userAId,
            receiver: userBId,
            postedDate: userSendObjectPackaged.datetime
          }]
        }, (error, message_entry) => {
          if(error){return console.error(error)}
          console.log("\n\nSaved in messages collection this new entry:\n", message_entry)
        })

      }
      
      // After the DB logic, now we determine whether the user B has a socket, to emit to, otherwise do nothing.
      // Re-query the sessions
      try {
        await mongodbClient.connect();

        sessionCollection = mongodbClient.db(ENV.database_name).collection("sessions")
        all_sessions = sessionCollection.find()
        sessions = await all_sessions.toArray()
  
        // console.log("\n\nSessions collection:\n\n", sessions)


        // Necessity to determine whether to emit to user B, i.e. user's B socket.userB == user A, if so emit to it's UI
        // We need 2 things:
        // 1. The socket ID of that user B, if any. -> userBSocketConnectionId
        // 2. User's B appended user B's ID. (user's B, user B if you will) (i.e. has to be communicating to user A). -> userB_is_SetupWithID

        let userBSocketConnectionId = null
        let userB_is_SetupWithID = null

        // Is user B socket connected? (i.e. has a socket ID in the sessions DB)
        let isUserBSocketConnected = (function(){
          let truthy_array_checker = []
          for (const session of sessions) {
            // Check for user B in sessions and whether has a socket connection
            if(session.session.userId.toString() == userBId && !!session.session.socket?.id){
              // User's B socket ID found 
              userBSocketConnectionId = session.session.socket.id
              userB_is_SetupWithID = session.session.socket.appendedUserB
              truthy_array_checker.push(true)
              break
            } else {
              truthy_array_checker.push(false)
            }
          }
          // console.log("truthy_array_checker: ", truthy_array_checker)
          return !(truthy_array_checker.every(bool => bool === false))
        })()
        
        console.log("\nDoes userB have a socket connection?: ", isUserBSocketConnected + "\n", "What is the socket id: ", userBSocketConnectionId + "\n", "Who is that socket destined to communicate to (hopefully me)? ", userB_is_SetupWithID)
        

        // Always emit to the message sender
        io.to(sckIdA).emit('broadcast', userSendObjectPackaged);
        
        // If user B has a socket, check if it is setup with user A, if so emit to user B
        if (isUserBSocketConnected) {
          
          // if user's B socket is linked to the senders users i.e user A ID or userSendObjectPackaged.chatUserId
          if(userSendObjectPackaged.chatUserId == userB_is_SetupWithID){
            // Emit to User B
            io.to(userBSocketConnectionId).emit('broadcast', userSendObjectPackaged);
          } else {
            // Do not emit to user B
            console.log("\n\nSocket B is not setup to receive messages from the msg emiting user")
          }
        }

      } catch (e) {
          console.error(e);
      } finally {
        console.log("4")
        await mongodbClient.close();
      }

    })
    // ______________________________________________________________________
    // End 'messaging'
  })
  // ______________________________________________________________________
  // End 'connection'
}

module.exports = {
  chatControllers: chatControllers,
}