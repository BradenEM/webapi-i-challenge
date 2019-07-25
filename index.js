// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

server.listen(4000, () => {
  console.log("Server is listening.");
});

server.get("/", (req, res) => {
  res.send("Hello from this page");
});
