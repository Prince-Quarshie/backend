//import express
require("dotenv").config();
const express = require("express");
const taskRoutes = require("./Routes/taskRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

const PORT = process.env.PORT || 3020;

// call the routes under /tasks
server.use("/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
