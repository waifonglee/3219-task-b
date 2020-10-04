Post = require('./postModel');

exports.index = function(req, res) {
    Post.get(function(err, posts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            
            res.json({
                status: "success",
                message: "post retrieved!",
                data: posts
            });
        }
    });
};

//create post
exports.new = function(req, res) {
    var post = new Post();
    post.content = req.body.content;
    post.title = req.body.title;
    post.author = req.body.author;

    post.save(function (err) {
        if (err) {
            res.json(err);
        } else {

            res.json({
                message: 'new post created!',
                data: post
            });
        }      
    });

};

exports.view = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'post details loading',
                data: post
            });
        }
    });
};

exports.update = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err) {
            res.send(err);
        } else {
            post.content = req.body.content;
            post.title = req.body.title;
            post.author = req.body.author;
            post.save(function(err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'post updated',
                    data: post
                });
            });
        }
    });
};

exports.delete = function(req, res) {
    Post.remove({
        _id: req.params.post_id
    }, function(err, post) {
        if (err)
            res.send(err);
        res.json({
            status:'success',
            message: 'post deleted'
        });
    });
};

