const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    prod_name: String,
    prod_desc: String,
    prod_price: Number,
    updated_at: { type: Date, default: Date.now }   // Auto  date 
},{
    versionKey: false 
})

module.exports = mongoose.model('Product', ProductSchema)

/* sample of versionkey 
var UserSchema = new mongoose.Schema({
    nickname: String,
    reg_time: {type: Date, default: Date.now}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
*/