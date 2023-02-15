var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/authDB').then(() => {console.log('connected to database')}).catch(err => {console.log("err:",err)})

module.exports = mongoose