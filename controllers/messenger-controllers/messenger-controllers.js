
// const mongoose = require('mongoose');

const Message = require('../../models/messaging-models/Message')
const Protagonist = require('../../models/messaging-models/Protagonist')

const ENV = require('../../config/base')
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId; 
const uri = ENV.database_link;
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const messaging_evt = require("./events/messaging_evt")
const disconnect_evt = require("./events/disconnect_evt")

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

      let sessionCollection = mongodbClient.db(ENV.database_name).collection("sessions")

      all_sessions = sessionCollection.find()
      sessions = await all_sessions.toArray()

      console.log("\n\nSessions collection:\n\n", sessions)
      

      for(let session of sessions) {
        // Identification of my session, if any
        // Identification comparision between the DB Collection & the socket session linkage made in the io-server-setup.js file 
        if (session.session.userId && session.session.userId.toString() == socket.request.session.userId) {

          // When my session is found, if any. Add the socket ID, and a appended user B the communications are attended to, to a socket field.
          // await does have an effect because without it would go 1,2,3,4, then back to resolving the promise, but at that point the mongo connection would be closed, thus throws an error.
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
    

    // Query the protagonists collection, to see if any entry with BOTH protagonists, if any.
    // Populate with sender information, because will be needed
    let protagonistEntryIfAny = await Protagonist.find({$and: [
      {protagonists: {$elemMatch: {"$in": [userAId]}}},
      {protagonists: {$elemMatch: {"$in": [userBId]}}}
    ]})
    
    // .populate("msg_stream.sender")
    
    console.log("\n\nAny found entry of the the 2 protagonist's in the protagonists collection?:\n")
    
    if(protagonistEntryIfAny[0]){
      console.log("\nA: YES\n")
      console.log("Found entry:\n\n", protagonistEntryIfAny[0])

      // Find the message entry that references both protagonists
      let message_entry_with_both_protagonists = await Message.find({protagonists: protagonistEntryIfAny[0]._id})
      .populate("msg_stream.sender")

      // Loop through the message.msg_stream to emit it on the connected socket to display past conversation.
      message_entry_with_both_protagonists[0].msg_stream.forEach(msg => {
        const format_for_UI_object = {
          content: msg.text,
          msgAuthorId: msg.sender._id,
          msgAuthorUsername: msg.sender.username,
          msgAuthorEmail: msg.sender.email,
          datetime: msg.postedDate
        }
        socket.emit("broadcast", format_for_UI_object)
      });
    } else {
      console.log("\nA: NO\n")
    }

    disconnect_evt(socket)    
    messaging_evt(socket, io, userAId, sckIdA, userBId)
  })
  // ______________________________________________________________________
  // End 'connection'
}


module.exports = chatControllers