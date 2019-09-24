const branchModel = require('../models/branchModel');
var schoolAdminSchema = require('../models/schoolAdminModel');
var mongoose = require('mongoose');
const saltRounds = 10;
const bcrypt = require('bcrypt');
require('dotenv').config();
var jwt = require('jsonwebtoken');
module.exports = {
    create: (req, res, next) => {
        if (req.body.email && req.body.password && req.body.branch_name && req.body.user_name &&
            req.body.school_id && req.body.branch_address && req.body.roll) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (hash) {
                    const insertBranch = new branchModel({
                        email: req.body.email,
                        school_id: req.body.school_id,
                        user_name: req.body.user_name,
                        password: hash,
                        branch_name: req.body.branch_name,
                        branch_address: req.body.branch_address,
                        roll: req.body.roll
                    });
                    insertBranch.save().then(data => {
                        res.status(200).send({ message: `${data.branch_name} Branch created successfully`, error: false });
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
    login: (req, res) => {
        if (req.body.password && req.body.email) {
            branchModel.find({
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
    },
    index: (req, res) => {
        if (req.params.school_id) {
            try {
                schoolAdminSchema.aggregate([
                    { $match: { "_id": mongoose.Types.ObjectId(req.params.school_id) } },
                    {
                        $lookup: {
                            from: "branches",
                            localField: "_id",
                            foreignField: "school_id",
                            as: "result"
                        }
                    },
                    { $unwind: "$result" },
                ]).then(data => {
                    const filteredData = []
                    data.map(item => {
                        delete item.result.password
                        filteredData.push(item.result)
                    })
                    res.status(200).send({ branchDetails: filteredData })
                }).catch(e => {
                    res.send("No Data Found")
                })
            } catch (e) {
                res.status(400).send({ message: 'Please check your details', error: true })
            }
        }
    },
    delete:(req, res) => {
        if(req.params.branch_id) {
            branchModel.remove({
                _id: req.params.branch_id
            }).then(data => {
                res.status(200).send({ message: 'Branch deleted', error: false })
            }).catch(e => {
                console.log(e)
            })
        } else {
            res.status(400).send({ message: 'Please check your details', error: true })
        }
    }
}