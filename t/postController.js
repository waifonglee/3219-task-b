'use strict';
const Post = require('./postModel');
const connectToDatabase = require('./db');
require('dotenv').config({ path: './variables.env' });

/*
module.exports.index = (req, res) => {
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
*/
module.exports.index = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    connectToDatabase()
      .then(() => {
        Post.find()
          .then(posts => callback(null, {
            statusCode: 200,
            body: JSON.stringify(posts)
          }))
          .catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the posts.'
          }))
      });
  };

//create post
module.exports.new = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    connectToDatabase()
      .then(() => {
        Post.create(JSON.parse(event.body))
          .then(post => callback(null, {
            statusCode: 200,
            body: JSON.stringify(post)
          }))
          .catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not create the post.'
          }));
      });
  };


/*
module.exports.new = (req, res) => {
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
*/

module.exports.view = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    connectToDatabase()
      .then(() => {
        Post.findById(event.pathParameters.id)
          .then(post => callback(null, {
            statusCode: 200,
            body: JSON.stringify(post)
          }))
          .catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the post.'
          }));
      });
  };

/*
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
*/
module.exports.update = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    connectToDatabase()
      .then(() => {
        Post.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
          .then(post => callback(null, {
            statusCode: 200,
            body: JSON.stringify(post)
          }))
          .catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the posts.'
          }));
      });
  };
  
  module.exports.delete = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    connectToDatabase()
      .then(() => {
        Post.findByIdAndRemove(event.pathParameters.id)
          .then(post => callback(null, {
            statusCode: 200,
            body: JSON.stringify({ message: 'Removed post with id: ' + post._id, post: post })
          }))
          .catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the posts.'
          }));
      });
  };

/*
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
module.exports.new = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  connectToDB()
    .then(() =>
      Post.create(JSON.parse(event.body))
    )
    .then(post => callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Created a new post', data: post})
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      body: 'Error in creating post.'
    }));
}


module.exports.view = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  connectToDB()
    .then(() =>
        Post.findById(event.pathParameters.id)
    )
    .then(post => callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Viewing post', data: post})
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the post.'
    }));
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
*/
