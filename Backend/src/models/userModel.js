const { Schema, model } = require('mongoose')

const userModel= new Schema({
    username: String,
    password: String,
    email: String,
    avatarURL: String

});

const user = model('usersPIF', userModel)

module.exports = user ;