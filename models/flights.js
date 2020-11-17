const mongoose = require('mongoose');
var dateFormat = require('dateformat');
var now = new Date();
now.setFullYear(now.getFullYear() + 1);

const destinationSchema = new mongoose.Schema({
    airport: {
        type: String,
        enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'],
        description: "Please choose ATL, DFW, DEN, LAX, or SAN.",
    },
    arrival: {
        type: Date
    }
}, {
    timestamps: true
});

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ["American", "Delta", "Southwest", "United"],
        reason: "Please choose American, Delta, Southwest, or United."
    },
    airport: {
        type: String,
        enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'],
        description: "Please choose ATL, DFW, DEN, LAX, or SAN.",
        default: "DEN"
    },
    flightNo: {
        type: Number,
        min: [10, "Flight number must be greater than 9."],
        max: [9999, "Flight number must be less than 10000."]
    },
    departs: {
        type: Date,
        default: now
    },
    destinations: [destinationSchema],
});

module.exports = mongoose.model('Flight', flightSchema);