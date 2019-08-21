var mongoose = require('mongoose');
const schema = mongoose.Schema;
let schoolAdminSchema = new schema({
    school_name: {type: String, unique: true, required: true},
    user_name: {type:String, required: true},
    roll: {type:String, required: true},
    address:{type:String, required: true},
    created_at: Date,
    updated_at: Date,
    email: {type: String, unique: true},
    password: {type:String, required: true},
});
let userModal = mongoose.model('schools', schoolAdminSchema);
module.exports = userModal;