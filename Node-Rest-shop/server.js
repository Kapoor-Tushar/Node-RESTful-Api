// Creating a sever
const http = require('http');
// Importing app from app.js file
const app = require('./app.js');

// Creating a port 
const port = process.env.PORT || 9000;

const server = http.createServer(app);

// Starting the server or start listening to the port mentioned
server.listen(port);

