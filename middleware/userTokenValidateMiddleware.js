let jwt = require('jsonwebtoken');
require('dotenv').config();
var schoolAdminSchema = require('../models/schoolAdminModel');
let checkUserToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    console.log(token)
    jwt.verify(token, process.env.private_key, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        schoolAdminSchema.find({ email: decoded.email })
        .then(data => {
            if (data.length > 0 && data[0].roll === decoded.roll) {
              next();
            } else {
              return res.json({
                success: false,
                message: 'You are Not Authuorized'
              });
            }
          })
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkUserToken: checkUserToken
}