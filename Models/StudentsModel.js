//import mongoose
const mongoose = require ("mongoose");

//define schema
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
})

//create model
const StudentModel = mongoose.model("Student", studentSchema);

//export model
module.exports = StudentModel;