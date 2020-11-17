const Flight = require('../models/flights');

module.exports = {
    create,
    delete: deleteDestination
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        flight.destinations.push(req.body);
        flight.save(function(err){
            if(!err){
                res.redirect(`/flights/${flight._id}`);
            }
        })
    });
}

function deleteDestination(req, res) {
    console.log('deleting');
    Flight.findById(req.params.id, function(err, flight){
        const destination = flight.destinations.findIndex(d => d.id === req.params.destId);
        flight.destinations.splice(destination, 1);
        flight.save(function(err){});
        if(!err){
            res.redirect(`/flights/${flight._id}`);
        }
    });
}