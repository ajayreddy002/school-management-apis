var mongoose = require('mongoose');
const schema = mongoose.Schema;
let teacherSchema = new schema({
    school_id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    teacher_name: { type: String, required: true },
    branch_name: { type: String, required: true },
    roll: { type: Number, required: true },
    branch_id: { type: String, required: true }
});
let teacherModel = mongoose.model('teachers', teacherSchema);
module.exports = teacherModel;