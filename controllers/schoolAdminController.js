var schoolAdminSchema =  require('../models/schoolAdminModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
var jwt = require('jsonwebtoken');
module.exports = {
    create: (req, res, next) => {
        // if (req.body.school_name && req.body.user_name && req.body.email && req.body.password
        //     && req.body.roll && req.body.address) {
                console.log(req.body);
               const createSchoolAdmin = new schoolAdminSchema({
                   school_name: req.body.school_name,
                   user_name: req.body.user_name,
                   email: req.body.email,
                   password: req.body.password,
                   roll: req.body.roll,
                   address: req.body.address,
                   created_at: Date.now(),
                   updated_at: Date.now()
               });
               createSchoolAdmin.save().then(data => {
                   console.log(data);
                   res.status(200).send(data)
               }).catch(err => {
                   console.log(err);
                   res.status(403).send({message:err.message})
               })
    //    }
   }
}