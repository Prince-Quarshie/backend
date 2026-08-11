const express = require("express");

// import the task controller
const { createTask, returnTask, updateTask, deleteTask } = require("../controller/task");

//define router
const router = express.Router();

//create task route
router.post("/", createTask);
router.get("/:id", returnTask);
router.get("/", returnTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
 
module.exports = router;