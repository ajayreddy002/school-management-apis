var mongoose = require('mongoose');
const schema = mongoose.Schema;
let studentSchema = new schema({
    school_id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    student_name: { type: String, required: true },
    roll: { type: Number, required: true },
    branch_id: { type: String, required: true }
});
let studentModel = mongoose.model('students', studentSchema);
module.exports = studentModel;