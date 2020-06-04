// Import Dependencies
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const app = require("./app");

// TODO Updated the env
const port = process.env.PORT || 3001; // Get the port from the Environment Vairable or port 3001 as defualt port
const server = http.createServer(app);
server.listen(port, () => console.log(`Server Started ${port}`));
