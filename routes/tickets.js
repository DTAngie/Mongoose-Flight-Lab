var express = require('express');
const { route } = require('.');
var router = express.Router();
var ticketsCtrl = require('../controllers/tickets');

router.get('/:id/tickets/new', ticketsCtrl.new);
router.post('/:id/tickets', ticketsCtrl.create);
router.delete('/:id/tickets/:ticketId', ticketsCtrl.delete);

module.exports = router;