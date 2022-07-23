const Message = require('../../models/messaging-models/Message')
// const mongoose = require('mongoose');

const ENV = require('../../config/base')
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId; 
const uri = ENV.database_link;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const Session = require("../../models/Session")

let chatController = (io) => {
  
  // CONNECT client calls io()
  io.on("connection", async socket =>{

    // https://socket.io/how-to/use-with-express-session
    // Actual Session
    // socket.request.session["socketId"] = socket.id
    console.log("\n\n_______________Actual Session wrapped in socketIO: ", socket.request.session);
    

    
    // console.log('\n_______', "new connection")

    const userAId = socket.request._query['userAId']
    const userBId = socket.request._query['userBId']
    const orderId = socket.request._query['orderId']


    // current socket
    const sckIdA = socket.id

    // console.log(`orderId: ${orderId}\nuser A: (id: ${userAId}, socketID: ${sckIdA})\nuser B: (id: ${userBId}, socketID: ${undefined})`, '\n_______');

    // Connected Sockets
    var srvSockets = io.sockets.sockets

    // Retrive the session information

    let sessions
    try {
      await client.connect();
      console.log(ENV.database_name)
      // databasesList = await client.db().admin().listDatabases();
      // console.log("Databases:");
      // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
      let sessionCollection = await client.db(ENV.database_name).collection("sessions")
      all_sessions = await sessionCollection.find()
      sessions = await all_sessions.toArray()

      console.log("did it work? ", sessions)
  
      
      // let sessions = await Session.find()
      // console.log(sessions)
      
      for(let session of sessions) {
        // console.log("what?\n", session.session.userId?.toString(), socket.request.session.userId)
        // console.log(session.session.userId?.toString() == socket.request.session.userId)
        
        if (session.session.userId && session.session.userId.toString() == socket.request.session.userId) {
          console.log("fuckshit: ", await sessionCollection.find().toArray())
          // let ret = await sessionCollection.find({"session.userId": ObjectId(socket.request.session.userId)})
          // console.log("fuckshit: ", await ret.toArray())
          console.log("0000")
          let prom_resolved = await sessionCollection.findOneAndUpdate({"session.userId": ObjectId(socket.request.session.userId)}, {$set: {"session.socket.id": socket.id, "session.socket.appendedUserB": userBId}}, { upsert: true, new: true })

          console.log("1")
        }
        console.log("2")
      }
      console.log("3")
    } catch (e) {
        console.error(e);
    } finally {
      console.log("CLOSEEE")
      await client.close();
    }

    let connected_sockets = []
    for (const key of srvSockets.keys()) {
      console.log(key, typeof key);
      connected_sockets.push(key)
    }

    console.log(connected_sockets);
    // iterator1.forEach(element => {
    //   console.log(element.next().value);
    // });

    // expected output: "0"

    // console.log(iterator1.next().value);
    // expected output: 1

    // console.log(typeof srvSockets, srvSockets)
    





    let found_protagonists_match = await Message.find({$and: [
      {protagonists: {$elemMatch: {"$in": [userAId]}}},
      {protagonists: {$elemMatch: {"$in": [userBId]}}}
    ]}).populate("msg_stream.sender")

    console.log("found protagonists?: \n", found_protagonists_match[0])
    
    if(found_protagonists_match[0]){
      console.log("load convo")
      found_protagonists_match[0].msg_stream.forEach(msg => {
        
        const packaged_historic_of_protagonists_msg = {
          content: msg.text,
          chatUserId: msg.sender._id,
          chatUserEmail: msg.sender.email,
          datetime: msg.postedDate
        }
        
        // TODO
        socket.emit("broadcast", packaged_historic_of_protagonists_msg)
        
      });
    }






    socket.on("messaging", async (userSendObjectPackaged)=>{

      let found_protagonists_match = await Message.find({$and: [
        {protagonists: {$elemMatch: {"$in": [userAId]}}},
        {protagonists: {$elemMatch: {"$in": [userBId]}}}
      ]})
  
      console.log("found protagonists?: \n", found_protagonists_match[0])



      if(found_protagonists_match[0]){
        console.log("we found")
        // (1) Add the message to the stream of messages between protagonists
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        Message.findOneAndUpdate( {
          _id: found_protagonists_match[0]._id,
        }, {
          "$push": { msg_stream: [{
            text: userSendObjectPackaged.content,
            sender: userAId,
            receiver: userBId,
            postedDate: new Date()
          }] }
        }, options, (error, new_message_stream_array) => {
          if(error) {console.error(error)} 
          console.log("msg stream length::::: \n", new_message_stream_array.length)     
        })

      } else {
        console.log("not found")
        // (2) Create the DB, Collection, and entry with the protagonists and messages
        Message.create({
          protagonists: [userAId, userBId],
          msg_stream: [{
            text: userSendObjectPackaged.content,
            sender: userAId,
            receiver: userBId,
            postedDate: new Date()
          }]
        }, (error, entry) => {
          if(error){return console.error(error)}
          console.log("Saved in messages collection this entry: ", entry)
        })

      }
      
      try {
        await client.connect();
        console.log(ENV.database_name)
        // databasesList = await client.db().admin().listDatabases();
        // console.log("Databases:");
        // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        let sessionCollection = await client.db(ENV.database_name).collection("sessions")
        all_sessions = await sessionCollection.find()
        sessions = await all_sessions.toArray()
  
        console.log("did it work? ", sessions)


      // TODO
      // Socket B Querying information
      // Check for socket presence
      console.log("\n\n\n\n__________\n____________upon msg event: ", connected_sockets, userBId, sessions)
      let userBSocketConnectionId = null
      let userBAppendedSocketsUserBId = null
        // user B socket present
        let isUserBSocketConnection = (function(){
          let truthy_array_checker = []
          for (const session of sessions) {
            if(session.session.userId.toString() == userBId && !!session.session.socket.id){
              userBSocketConnectionId = session.session.socket.id
              userBAppendedSocketsUserBId = session.session.socket.appendedUserB
              // io.emit("broadcast", userSendObjectPackaged)
              console.log("_______send event: ", session.session.socket.id, sckIdA, userSendObjectPackaged, "_________")
              truthy_array_checker.push(true)
            } else {
              truthy_array_checker.push(false)
            }
          }
          console.log("truthy_array_checker: ", truthy_array_checker)
          return !(truthy_array_checker.every(bool => bool === false))
        })()
        
        console.log("userB has a socket?: ", isUserBSocketConnection, "what is the socket id: ", userBSocketConnectionId)
        
        
        io.to(sckIdA).emit('broadcast', userSendObjectPackaged);
        
        
        
        
        if (isUserBSocketConnection) {

          // Determining whether to emit to user B depending on socket set up
          // The person we are allowed to talk to is determined by how the socket is set up
          console.log("\n\n___Before emiting\n", "sockets UI user B is: \n", userBAppendedSocketsUserBId, "\nsource of message has to be the sockets UI user B: \n", userSendObjectPackaged.chatUserId)
          
          // if the socket is setup with user B, we only want 
          if(userSendObjectPackaged.chatUserId == userBAppendedSocketsUserBId){
            io.to(userBSocketConnectionId).emit('broadcast', userSendObjectPackaged);
          } else {
            console.log("Socket B is not setup to receive messages from the msg emiting user")
          }

        }

        // if not: do nothing

      console.log("Received from client input.value", userSendObjectPackaged)
      // io.emit("broadcast", userSendObjectPackaged)

    } catch (e) {
        console.error(e);
    } finally {
      console.log("CLOSEEE")
      await client.close();
    }

    })
    
    // DISCONNECT client page reloads or exits (because io() looses the connection?)
    socket.on("disconnect", async () => {
      console.log('user disconnected');
      try {
        await client.connect();
        console.log(ENV.database_name)
        // databasesList = await client.db().admin().listDatabases();
        // console.log("Databases:");
        // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        let sessionCollection = await client.db(ENV.database_name).collection("sessions")
        all_sessions = await sessionCollection.find()
        sessions = await all_sessions.toArray()
  
        console.log("did it work? ", sessions)
        let prom2_resolved = await sessionCollection.update({"session.userId": ObjectId(socket.request.session.userId)}, {$unset: {"session.socket":1}});

        // let prom_resolved = await sessionCollection.findOneAndUpdate({"session.userId": ObjectId(socket.request.session.userId)}, {$set: {"session.socketId": socket.id}}, { upsert: true, new: true })

      } catch (e) {
        console.error(e);
      } finally {
        console.log("CLOSEEE")
        await client.close();
      }

    });
  })
}

module.exports = {
  chatController: chatController,
}