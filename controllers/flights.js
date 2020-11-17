const Flight = require('../models/flights');
var dateFormat = require('dateformat');

module.exports = {
    index,
    create,
    new: newFlight,
    show
};

function index(req, res) {
    let today = new Date();
    Flight.find({}).sort({departs: 'ascending'}).exec(function(err, allFlights) {
        res.render('flights/index', {
            flights: allFlights,
            dateFormat,
            today
        });
    });
}

function newFlight(req, res){
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    date = date.toISOString().slice(0,16);
    res.render('flights/new', {date: date});
}

function create(req, res){

    var newFlight = {
        airline: req.body.airline,
        flightNo: req.body.flightNo
    };

    if(req.body.airport){
        newFlight.airport = req.body.airport;
    }

    if(req.body.departs){
        newFlight.departs = req.body.departs;
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

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        if(err) {
            res.render('flights/index')
        }
        res.render(`flights/show`, {flight});
    });
}