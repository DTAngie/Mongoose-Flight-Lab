const Flight = require('../models/flights');
const Ticket = require('../models/tickets');
const { request } = require('../server');

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}

function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        if(err) {
            res.redirect(`/flights/${flight._id}`);
        }
        res.render('tickets/new', {flightId: flight._id});
    });
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        if(err) {
            res.redirect(`/flights/${flight._id}/tickets/new`);
        }
        req.body.flight = flight._id;
        Ticket.create(req.body, function(err, ticket){
            res.redirect(`/flights/${flight._id}`);
        });
    });
}

function deleteTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        const flightID = flight._id;
        Ticket.deleteOne({_id: req.params.ticketId}, function(err){
            if(!err){
                res.redirect(`/flights/${flightID}`);
            }

        });
    });
}