const Flight = require('../models/flights');

module.exports = {
    create
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