var express = require('express');
var router = express.Router();
var db = require('../middleware/db.middleware');
var schoolController = require('../controllers/schoolController');
var branchController = require('../controllers/branchController');
var studentController = require('../controllers/studentController');
const schoolAdmin = require('../middleware/userTokenValidateMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerSchoolTemplate.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// School Admin and school routes
router.post('/school', schoolController.create);
router.post('/loginschool', schoolController.loginSchoolAdmin);
// Branch Routes
router.post('/addbranch', schoolAdmin.checkUserToken ,branchController.create);
router.post('/loginbranch',branchController.login);
router.get('/branch/:school_id',branchController.index);
router.delete('/branch/:branch_id', schoolAdmin.checkUserToken, branchController.delete);
// Students routes
router.post('/student',studentController.create);

module.exports = router;
