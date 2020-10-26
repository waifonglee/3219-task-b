'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDB = require('./db');
const Post = require('./PostModel');

module.exports.new = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
    .then(() =>
      Post.create(JSON.parse(event.body))
    )
    .then(post => callback(null, {
      statusCode: 200,
      body: JSON.stringify({message: "created new post", data: post})
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      body: err
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
      body: JSON.stringify({message: "viewing post", data: post})
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      body: err
    }));
};

module.exports.index = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDB()
    .then(() =>
      Post.find()
    )
    .then(posts => callback(null, {
      statusCode: 200,
      body: JSON.stringify({message: "getting all posts", data:posts})
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      body: err
    }))
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDB()
    .then(() =>
      Post.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
    )
    .then(post => callback(null, {
      statusCode: 200,
      body: JSON.stringify({message: "updated post", data: post})
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      body: err
    }));
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDB()
    .then(() =>
      Post.findByIdAndRemove(event.pathParameters.id)
    )
    .then(post => callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: "removed post", data: post })
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      body: err
    }));
};