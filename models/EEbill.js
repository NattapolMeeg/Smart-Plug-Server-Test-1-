const mongoose = require("mongoose");

const ElectricalSchema = new mongoose.Schema({
    Unit: Number,
    EEbill: Number ,
    updated_at: { type: Date, default: Date.now } 
},{
    versionKey: false 
})

module.exports = mongoose.model('Electrical', ElectricalSchema)

/* sample of versionkey 
var UserSchema = new mongoose.Schema({
    nickname: String,
    reg_time: {type: Date, default: Date.now}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
*/