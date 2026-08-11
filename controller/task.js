const taskModel = require("../Models/taskModel");
const { validationResult } = require("express-validator");

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
      res.status(500).json({ message: "Error creating task", error });
    });
};

 
//return the task
const returnTask = (req, res) => {
    const taskId = req.params.id;
    if (taskId) {
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

    taskModel.findById(taskId)
       .then((task) => {
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }

            task.title = title || task.title;
            task.description = description || task.description;
            task.completed = completed !== undefined ? completed : task.completed;
            task.dueDate = dueDate || task.dueDate;
            return task.save();
        })
        .then((task) => {
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