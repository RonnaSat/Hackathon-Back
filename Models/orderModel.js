const mongoose = require('mongoose');
const { Schema } = mongoose;



const orderSchema = new mongoose.Schema({

    userID: { type: Schema.Types.ObjectId, ref: 'user' },
    productID: { type: Schema.Types.ObjectId, ref: 'product' },
    productPickTime: { type: Date, require: true }
});

module.exports = mongoose.model('order', orderSchema);