const { Schema, model } = require('mongoose')

const postModel = new Schema(
    {
        title: String,
        description: String,
        autor: {
            type: Schema.Types.ObjectId,
            ref: 'usersPIF',
        },
        comments:[{
            type: Schema.Types.ObjectId,
            ref: 'comment',
        }] ,
        imageURL: String,
    },
    {
        timestamps: true, 
    }
);

const post = model('post', postModel)

module.exports = post;