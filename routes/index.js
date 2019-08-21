var express = require('express');
var router = express.Router();
var db = require('../middleware/db.middleware');
var schoolController = require('../controllers/schoolAdminController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/addschool', schoolController.create)
module.exports = router;
