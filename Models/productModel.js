const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    productName: { type: String, default: null, unique: true },
    productLocation: { type: String, default: null },
    productDescription: { type: String, default: null },
    productContacts: [String],
    productImageBase64: { type: Buffer, default: null }
});

module.exports = mongoose.model('product', userSchema);