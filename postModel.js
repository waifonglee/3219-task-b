var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Post = module.exports = mongoose.model('post', postSchema);
module.exports.get = function(callback, limit) {
    Post.find(callback).limit(limit);
}