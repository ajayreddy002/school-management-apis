var mongoose = require('mongoose');
const schema = mongoose.Schema;
let branchSchema = new schema({
    school_id: {type: mongoose.Schema.ObjectId, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    user_name: {type: String, required: true},
    branch_name: {type: String, required: true},
    roll: {type: Number, required: true},
    branch_address: {type: String, required: true},
});
let branchModel = mongoose.model('branches', branchSchema);
module.exports = branchModel;