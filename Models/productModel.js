const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, unique: true },
    productLocation: { type: String, default: null },
    productQuantity: { type: Number, default: 0 },
    productDescription: { type: String, default: null },
    productContacts: [String],
    productImageBase64: { type: Buffer, default: null }
});

module.exports = mongoose.model('product', productSchema);