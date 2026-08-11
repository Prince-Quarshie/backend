const StudentModel = require("../Models/StudentsModel");
const { validationResult } = require("express-validator");
//CREATE
const registerStudent = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
     return res.status(500).json(errors.array()[0].msg);
  }

  //retrieve data from the request body
  const { name, age, gender, location } = req.body;

  //send the data to the database
  const student = new StudentModel({ name, age, gender, location });

  //save the data to the database
  student
    .save()
    .then(() => {
      // send the response back to the client
      res
        .status(201)
        .json({ message: "Student registered successfully", student });
    })
    .catch((error) => {
      // send an error response
      res.status(500).json({ message: "Error registering student", error });
    });
};

//RETRIEVE
const retrieveStudent = (req, res) => {
  const id = req.params.id;
  if (id) {
    StudentModel.findById(id)
      .then((student) => {
        if (!student) {
          return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({
          message: "Student data found",
          data: student,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    StudentModel.find()
      .then((student) => {
        res.status(200).json({
          message: "Student data found",
          data: student,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
};

//UPDATE
const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, age, gender, location } = req.body;

  StudentModel.findById(id)
    .then((student) => {
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      student.name = name;
      student.age = age;
      student.gender = gender;
      student.location = location;

      return student.save();
    })
    .then((student) => {
      if (student) {
        res.status(200).json({
          message: "Student data updated successfully",
          data: student,
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//DELETE
const deleteStudent = (req, res) => {
  const { id } = req.params;

  StudentModel.findByIdAndDelete(id)
    .then((deletedstudent) => {
      if (deletedstudent) {
        res.status(200).json({ message: "Student data deleted successfully" });
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  registerStudent,
  retrieveStudent,
  updateStudent,
  deleteStudent,
};
