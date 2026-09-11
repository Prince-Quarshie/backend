const express = require("express");
const { body } = require("express-validator");

// import the task controller
const { createTask, returnTask, updateTask, deleteTask } = require("../controller/task");

//define router
const router = express.Router();

//create task route
router.post(
	"/",
	body("title").trim().notEmpty().withMessage("Title is required"),
	body("description").optional().isString().withMessage("Description must be text"),
	body("completed").optional().isBoolean().withMessage("Completed must be true or false"),
	body("dueDate").optional().isISO8601().withMessage("Due date must be a valid date"),
	createTask
);
router.get("/:id", returnTask);
router.get("/", returnTask);
router.put(
	"/:id",
	body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
	body("description").optional().isString().withMessage("Description must be text"),
	body("completed").optional().isBoolean().withMessage("Completed must be true or false"),
	body("dueDate").optional().isISO8601().withMessage("Due date must be a valid date"),
	updateTask
);
router.delete("/:id", deleteTask);
 
module.exports = router;