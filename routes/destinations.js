var express = require('express');
const { route } = require('.');
var router = express.Router();
var destinationsCtrl = require('../controllers/destinations');

router.post('/flights/:id/destinations', destinationsCtrl.create);
router.delete('/flights/:id/destinations/:destId', destinationsCtrl.delete);

module.exports = router;