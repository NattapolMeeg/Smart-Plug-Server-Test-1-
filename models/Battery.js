const mongoose = require("mongoose");

const BatterySchema = new mongoose.Schema({
    Voltage: Number,
    Current: Number,
    Temperature: Number,
    Percentage : Number,
    Status: Boolean,
    updated_at: { type: Date, default: Date.now } 
},{
    versionKey: false 
})

module.exports = mongoose.model('Battery', BatterySchema)