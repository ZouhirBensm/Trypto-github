const mongoose = require('mongoose')
const User = require('../models/User')

mongoose.connect('mongodb://localhost/mern_database', {useNewUrlParser:true})

User.create({
  email: 'z@gmail.com',
  password: 'Zouhir123'
}, (error, user)=> {
  console.log(error, user)
})
