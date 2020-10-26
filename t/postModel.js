var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    author: {
        type: String,
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);

/*
var Post = module.exports = mongoose.model('post', postSchema);

module.exports.get = function(callback, limit) {
    Post.find(callback).limit(limit);
}
*/