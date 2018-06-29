const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const MongoURI = process.env.MONGODB_URI

mongoose.connect(MongoURI)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {})
var kittySchema = mongoose.Schema({
  name: String
})
var Kitten = mongoose.model('Kitten', kittySchema)
var felyne = new Kitten({ name: 'Felyne' })

express()
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
