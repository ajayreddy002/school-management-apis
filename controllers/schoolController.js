var schoolAdminSchema = require('../models/schoolAdminModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
var jwt = require('jsonwebtoken');
const saltRounds = 10;
module.exports = {
    create: (req, res) => {
        console.log(req.body)
        if (req.body.school_name && req.body.user_name && req.body.email && req.body.password
            && req.body.roll && req.body.school_address) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                const createSchoolAdmin = new schoolAdminSchema({
                    school_name: req.body.school_name,
                    user_name: req.body.user_name,
                    email: req.body.email,
                    password: hash,
                    roll: req.body.roll,
                    address: req.body.school_address,
                    created_at: Date.now(),
                    updated_at: Date.now()
                });
                createSchoolAdmin.save().then(data => {
                    res.status(200).send({message:  `${data.user_name}User registered successfully`});
                }).catch(err => {
                    res.status(403).send({ message: err.message })
                })
            });
        } else {
            res.status(403).send( 'Required parameters are missing' )
        }
    },
    loginSchoolAdmin: (req, res) => {
        if (req.body.password && req.body.email) {
            schoolAdminSchema.find({
                email: req.body.email,
            }).then(data => {
                if (data.length === 0) {
                    res.send({ message: 'No Details Found' })
                } else {
                    delete data[0].email;
                    bcrypt.compare(req.body.password, data[0].password, function (err, result) {
                        if (result === true) {
                            const userData = {
                                email: data[0].email,
                                user_name: data[0].user_name,
                                school_name: data[0].school_name,
                                roll: data[0].roll,
                                address: data[0].address,
                                school_id: data[0]._id,
                            };
                            payload = { email: req.body.email, roll: data[0].roll, name: data[0].user_name };
                            options = { expiresIn: '2h' };
                            iat = Math.floor(Date.now() / 1000) - 30
                            secret = process.env.private_key;
                            const token = jwt.sign(payload, secret, options, iat);
                            res.status(200).send({ result: [userData], message: 'Login successfull', access_token: token});
                        } else {
                            res.send({ message: 'Please enter valid details' })
                        }
                    });
                }
            }).catch(e => {
                res.send({ message: 'No Details Found' })
            })
        }
    }
}