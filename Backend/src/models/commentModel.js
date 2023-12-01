const { Schema, model } = require('mongoose')

const commentModel = new Schema({
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'usersPIF',
    },
    description: String,
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
    },
});

const comment = model('comment', commentModel)

module.exports = comment;