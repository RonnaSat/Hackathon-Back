const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fName: { type: String, default: null },
    lName: { type: String, default: null },
    email: { type: String, index: true, unique: true },
    pwd: { type: String },
    role: { type: String, default: '0' },
    token: { type: String }
});

module.exports = mongoose.model('user', userSchema);