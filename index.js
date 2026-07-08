const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("GET succesful");
});

server.post("/", (req, res) => {
  res.send("POST succesful");
});

server.put("/", (req, res) => {
  res.send("PUT succesful");
});

server.delete("/", (req, res) => {
  res.send("DELETE succesful");
});

server.listen(3008, "localhost", () => {
  console.log("Server is running on http://localhost:3008");
});