const mongoose = require('mongoose')
// var fs = require("fs");
require('dotenv').config();


// TODO !!!!! Make this script delete the entire collection and populate. Then, make it part of the production CI,CD process

const FAQs = require('../../full-stack-libs/Data/FAQs')

const FAQ = require('../../models/operations-models/FAQ')


const ENV = require('../../config/base');

console.log(ENV)



mongoose.set('strictQuery', true);



(async () => {

  await mongoose.connect(ENV.database_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const connection = mongoose.connection



  // console.log("\n\nret_user---->", ret_user)



  for (let i = 0; i < FAQs.length; i++) {




    let FAQ_entry = FAQs[i]


    let url_path = FAQ_entry.title.toLowerCase()
    .replace(/[^\w\s]|_/g, '') // Remove punctuation
    .toLowerCase()
    .replace(/\s+/g, '-');


    FAQ_entry.link = `/FAQ/${url_path}`

    

    let ret_FAQ_instance

    ret_FAQ_instance = new FAQ(FAQ_entry)

    
    let ret_FAQ_save

    try {
      ret_FAQ_save = await ret_FAQ_instance.save()
    } catch (e) {
      console.log(e)
    }


    console.log("\n\nret_FAQ_save---->", ret_FAQ_save)

  }


  // Close mongoose connection, this also ends the mongoDB process
  await connection.close();

})();


