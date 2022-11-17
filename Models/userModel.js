const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fName: { type: String, require: true },
    lName: { type: String, require: true },
    email: { type: String, index: true, unique: true },
    pwd: { type: String, require: true },
    role: { type: String, default: '0' },
    token: { type: String }
});

module.exports = mongoose.model('user', userSchema);