const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {type : String , required: true},
    password: {type : String , required: true, unique:true},
    email: {type : String , required: true},
    isAdmin:{type:Boolean, default:false},},
{collections: 'users'}
)

const User = mongoose.model('User', userSchema)

module.exports = User; 