const bcrypt = require('bcrypt');
require('dotenv').config();
const studentModel = require('../models/studentModel');
const saltRounds = 10;
module.exports = {
    create: (req, res, next) => {
        if (req.body.email && req.body.password && req.body.student_name &&
            req.body.school_id && req.body.branch_id) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                console.log(err, 'err')
                if (hash) {
                    const addStudent = new studentModel({
                        email: req.body.email,
                        school_id: req.body.school_id,
                        password: hash,
                        student_name: req.body.student_name,
                        roll: req.body.roll,
                        branch_id: req.body.branch_id
                    });
                    addStudent.save().then(data => {
                        res.status(200).send({ message: `${data.student_name} student added successfully`, error: false });
                    }).catch(err => {
                        res.status(403).send(err);
                    });
                } else {
                    res.status(500).send('Something went wrong');
                }
            });
        } else {
            res.send({ message: 'Required parameters are missing' })
        }
    },
}