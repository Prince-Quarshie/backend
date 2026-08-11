const express = require("express");
const studentRoute = require("./Routes/StudentsR");
const mongoose = require("mongoose");

const server = express();
server.use(express.json());

const PORT = 3010;

//call the routes
server.use(studentRoute);

mongoose.connect("mongodb+srv://quashieprince_db_user:uUpP5Zt5tEEqUIyi@cluster0.0yvdzya.mongodb.net/?appName=Cluster0")
.then(() => {
 server.listen(PORT,"localhost", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
})

.catch((error) => {
  console.log("Error connecting to MongoDB", error);
});






