
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mobile: {
        type: Number,

    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
    },
    year_born:{
        type:Number,
    },
    password: {
        type: String,
    },
});


module.exports = mongoose.model("User", UserSchema);
