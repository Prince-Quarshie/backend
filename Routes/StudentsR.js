//import express
const express = require("express");
const {body} = require("express-validator");

//import controller
const { registerStudent, retrieveStudent, updateStudent, deleteStudent } = require("../Controller/Student");
const StudentModel = require("../Models/StudentsModel");

//define router
const router = express.Router();

//create student route
router.post("/register", body("name").trim().notEmpty().withMessage("Enter your name").custom((value, { req }) => {
    return StudentModel.findOne({ name: value }).then((student) => {
        if (student) {
            return Promise.reject("Name already exists");
        }
    })
}),registerStudent);
router.get("/students", retrieveStudent);
router.get("/students/:id", retrieveStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

//export router
module.exports = router;