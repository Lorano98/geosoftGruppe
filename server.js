// Expanded Version
let http = require('http'); // use an existing module from node
let host = 'localhost'; // 127.0.0.1
let port = 5000;
let server = http.createServer(handleRequest); // create a server
server.listen(port, host); // say where the server should listen
// say what the server should do, when it gets an incoming request

const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017'; // connection URL
const client = new MongoClient(url); // mongodb client

function handleRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Helloooooooooooo');
    res.end();
}
console.log(`Server is running on ${host}:${port}`);
