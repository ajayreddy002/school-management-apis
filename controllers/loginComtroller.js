var schoolAdminSchema = require('../models/schoolAdminModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
var jwt = require('jsonwebtoken');
const branchModel = require('../models/branchModel');
const saltRounds = 10;
loginMethods = module.exports = {
    login: async (req, res) => {
        if (req.body.password && req.body.email) {
            // console.log(req.body)
            schoolAdminSchema.find({
                email: req.body.email,
            }).then(data => {
                if (data.length === 0) {
                    loginMethods.loginBranch(req, res);
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
                            res.status(200).send({ result: [userData], message: 'Login successfull', access_token: token });
                        } else {
                            res.send({ message: 'Please enter valid details' })
                        }
                    });
                }
            }).catch(e => {
                console.log(e, 'errr')
                res.send({ message: 'No Details Found' })
            })
        } else {
            res.send({ message: 'Please enter valid details' })
        }

    },
    loginBranch: (req, res) => {
        branchModel.find({
            email: req.body.email,
        }).then(data => {
            console.log(data)
            if (data.length === 0) {
                res.send({ message: 'No Details Found' })
            } else {
                delete data[0].email;
                bcrypt.compare(req.body.password, data[0].password, function (err, result) {
                    if (result === true) {
                        const userData = {
                            email: data[0].email,
                            user_name: data[0].user_name,
                            roll: data[0].roll,
                            address: data[0].address,
                            branch_id: data[0]._id,
                            school_id: data[0].school_id,
                        };
                        payload = { email: req.body.email, roll: data[0].roll, name: data[0].user_name };
                        options = { expiresIn: '2h' };
                        iat = Math.floor(Date.now() / 1000) - 30
                        secret = process.env.private_key;
                        const token = jwt.sign(payload, secret, options, iat);
                        res.status(200).send({ result: [userData], message: 'Login successfull', access_token: token });
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