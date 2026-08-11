//import express
require("dotenv").config();
const express = require("express");
const taskRoutes = require("./Routes/taskRoutes");
const mongoose = require("mongoose");

const server = express();
server.use(express.json());

const PORT = 3020;

// call the routes under /tasks
server.use("/tasks", taskRoutes);

mongoose.connect("mongodb+srv://quashieprince_db_user:SyWupkCu07EUy9mm@task-manager-api.5jq31hc.mongodb.net/")
.then(() => {
    server.listen(PORT, "localhost", () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
