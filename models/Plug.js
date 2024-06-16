const mongoose = require("mongoose");

const PlugSchema = new mongoose.Schema({
    Voltage: Number,
    Current: Number,
    Power: Number,
    Status: Boolean,
    DeviceRunTime : Number,
    updated_at: { type: Date, default: Date.now } 
},{
    versionKey: false 
})

module.exports = mongoose.model('Plug', PlugSchema)