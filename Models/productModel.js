const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, require: true },
    productLocation: { type: String, require: true },
    productQuantity: { type: Number, default: 0 },
    productDescription: { type: String, default: null },
    productContacts: [String],
    productImageBase64: { type: String, default: null }
});

module.exports = mongoose.model('product', productSchema);