const taskModel = require("../Models/taskModel");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const hasValidId = (id) => mongoose.isValidObjectId(id);

//create task
const createTask = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array()[0].msg);
    }

    //retrieve data from the request body
  const { title, description, completed, dueDate } = req.body;

   //send the data to the database
  const task = new taskModel({ title, description, completed, dueDate });

  //save the data to the database
  task
    .save()
    .then(() => {
      // send the response back to the client
      res
        .status(201)
        .json({ message: "Task created successfully", task });
    })
    .catch((error) => {
      // send an error response
    res.status(500).json({ message: "Error creating task" });
    });
};

 
//return the task
const returnTask = (req, res) => {
    const taskId = req.params.id;
    if (taskId) {
        if (!hasValidId(taskId)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        taskModel.findById(taskId)
            .then((task) => {
                if (!task) {
                    return res.status(404).json({ error: "Task not found" });
                }
                res.status(200).json({
                    message: "Task retrieved successfully",
                    data: task
                });
            })
            .catch((error) => {
                res.status(500).json({ error: "Error retrieving task" });
            });
        } else {
            taskModel.find()
            .then((tasks) => {
                res.status(200).json({
                    message: "Tasks retrieved successfully",
                    data: tasks
                });
            })
            .catch((error) => {
                res.status(500).json({ error: "Error retrieving tasks" });
            });

    }
};

//update task
const updateTask = (req, res) => {
    const taskId = req.params.id;
    const { title, description, completed, dueDate } = req.body;

    if (!hasValidId(taskId)) {
        return res.status(400).json({ error: "Invalid task ID" });
    }

    taskModel.findById(taskId)
       .then((task) => {
            if (!task) {
                return null;
            }

            task.title = title !== undefined ? title : task.title;
            task.description = description !== undefined ? description : task.description;
            task.completed = completed !== undefined ? completed : task.completed;
            task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
            return task.save();
        })
        .then((task) => {
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }
            res.status(200).json({
                message: "Task updated successfully",
                data: task
            });
        })
        .catch((error) => {
            res.status(500).json({ error: "Error updating task" });
        });
};

//delete task
const deleteTask = (req, res) => {
    const taskId = req.params.id;

    if (!hasValidId(taskId)) {
        return res.status(400).json({ error: "Invalid task ID" });
    }

    taskModel.findByIdAndDelete(taskId)
        .then((deletetask) => {
            if (!deletetask) {
                return res.status(404).json({ error: "Task not found" });
            }
            res.status(200).json({
                message: "Task deleted successfully",
                data: deletetask
            });
        })
        .catch((error) => {
            res.status(500).json({ error: "Error deleting task" });
        });
};

module.exports = {
    createTask,
    returnTask,
    updateTask,
    deleteTask
};