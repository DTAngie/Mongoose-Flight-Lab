const Flight = require('../models/flights');
var dateFormat = require('dateformat');

module.exports = {
    index,
    create,
    new: newFlight
};

function index(req, res) {
    Flight.find({}, function(err, allFlights) {
        res.render('flights/index', {
            flights: allFlights,
            dateFormat
        });
    });
}

function newFlight(req, res){
    res.render('flights/new');
}

function create(req, res){

    var newFlight = {
        airline: req.body.airline,
        flightNo: req.body.flightNo
    };

    if(req.body.airport){
        newFlight.airport = req.body.airport;
    }

    Flight.create(newFlight, function(err, flight){
        if(err){
            let errKeys = Object.keys(err.errors);
            let errArray = [];
            errKeys.forEach(function (e) {
                if (e === "airline"){
                    errArray.push("Please choose American, Delta, Southwest, or United.");
                } else if (e === "airport"){
                    errArray.push("Please choose ATL, DFW, DEN, LAX, or SAN.");
                } else {
                    errArray.push(err.errors[e]);
                }
                
            });
            res.render('flights/new', {error: errArray});
        } else {
            res.redirect('/flights');
        }
    });
}