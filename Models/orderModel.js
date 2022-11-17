const mongoose = require('mongoose');
const { Schema } = mongoose;



const orderSchema = new mongoose.Schema({

    userID: { type: Schema.Types.ObjectId, ref: 'user' },
    productID: { type: Schema.Types.ObjectId, ref: 'product' },
    productPickTime: { type: String, require: true }
});

module.exports = mongoose.model('order', orderSchema);