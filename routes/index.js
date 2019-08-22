var express = require('express');
var router = express.Router();
var db = require('../middleware/db.middleware');
var schoolController = require('../controllers/schoolAdminController');
var branchController = require('../controllers/branchController');
const schoolAdmin = require('../middleware/userTokenValidateMiddleware');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/addschool', schoolController.create);
router.post('/loginschool', schoolController.loginSchoolAdmin);
router.post('/addbranch', schoolAdmin.checkUserToken ,branchController.create);
router.post('/loginbranch',branchController.login);
module.exports = router;
