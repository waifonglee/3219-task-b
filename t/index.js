// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./t/api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('https://yc53j3ebn1.execute-api.us-east-1.amazonaws.com/dev/api/posts', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
//var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
//const server = app.listen(port, function () {
//    console.log("Running blog on port " + port);
//});
var serverless = require('serverless-http');
module.exports.handler = serverless(app);

//module.exports = server;