var express = require('express');
var router = express.Router();
var db = require('../middleware/db.middleware');
var schoolController = require('../controllers/schoolController');
var branchController = require('../controllers/branchController');
var studentController = require('../controllers/studentController');
var teacherController = require('../controllers/teacherCOntroller');
const schoolAdmin = require('../middleware/userTokenValidateMiddleware');
const branchTokenValidator = require('../middleware/branchTokenValidate');
const loginController = require('../controllers/loginComtroller');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// School Admin and school routes
router.post('/school', schoolController.create);
router.post('/login', loginController.login);
// Branch Routes
router.post('/addbranch', schoolAdmin.checkUserToken, branchController.create);
router.post('/loginbranch', branchController.login);
router.get('/branch/:school_id', schoolAdmin.checkUserToken, branchController.index);
router.delete('/branch/:branch_id', schoolAdmin.checkUserToken, branchController.delete);
// Students routes
router.post('/student', branchTokenValidator.checkBranchToken, studentController.create);
// Teacher routes
router.post('/teacher', branchTokenValidator.checkBranchToken, teacherController.create);

module.exports = router;
