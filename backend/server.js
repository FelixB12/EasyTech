// Import Dependencies
const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3001; // Get the port from the Environment Vairable or port 3000 as defualt port
const server = http.createServer(app);
server.listen(port);
//
