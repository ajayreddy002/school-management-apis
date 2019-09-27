const bcrypt = require('bcrypt');
require('dotenv').config();
const teacherModal = require('../models/teacherModel')
const saltRounds = 10;
module.exports = {
    create: (req, res, next) => {
        if (req.body.email && req.body.password && req.body.teacher_name &&
            req.body.school_id && req.body.branch_id) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (hash) {
                    const addTeacher = new teacherModal({
                        email: req.body.email,
                        school_id: req.body.school_id,
                        password: hash,
                        teacher_name: req.body.teacher_name,
                        roll: req.body.roll,
                        branch_id: req.body.branch_id,
                        branch_name: req.body.branch_name
                    });
                    addTeacher.save().then(data => {
                        res.status(200).send({ message: `${data.teacher_name} teacher added successfully`, error: false });
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