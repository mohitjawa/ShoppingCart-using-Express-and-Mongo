
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    Pname: {
        type: String,
    },
    Pprice: {
        type: Number,

    },
    Pimage: {
        type: String,
    },
    Pdescription:{
        type:String,
    },
});


module.exports = mongoose.model("Products", ProductSchema);
