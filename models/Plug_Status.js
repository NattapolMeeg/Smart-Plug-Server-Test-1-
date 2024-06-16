const mongoose = require("mongoose");

const PlugStatus = new mongoose.Schema({
    Status: Boolean,
    updated_at: { type: Date, default: Date.now } 
},{
    versionKey: false 
})

module.exports = mongoose.model('Plug_Status', PlugStatus)