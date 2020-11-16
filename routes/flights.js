var express = require('express');
const { route } = require('.');
var router = express.Router();
var flightsCtrl = require('../controllers/flights');

/* GET users listing. */
router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.post('/', flightsCtrl.create);

module.exports = router;
