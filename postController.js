Post = require('./postModel');

exports.index = (req, res) => {
    Post.get((err, posts) => {
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
exports.new = (req, res) => {
    var post = new Post();
    post.content = req.body.content;
    post.title = req.body.title;
    post.author = req.body.author;

    post.save((err) => {
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

exports.view = (req, res) => {
    Post.findById(req.params.post_id, (err, post) => {
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

exports.update = (req, res) => {
    Post.findById(req.params.post_id, (err, post) => {
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

exports.delete = (req, res) => {
    Post.deleteOne({
        _id: req.params.post_id
    }, (err, post) => {
        if (err)
            res.send(err);
        res.json({
            status:'success',
            message: 'post deleted'
        });
    });
};

