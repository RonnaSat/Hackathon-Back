const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    fName: { type: String, require: true },
    lName: { type: String, require: true },
    gender: { type: String, require: true },
    fragrance: { type: Number, require: true },
    longevity: { type: Number, require: true },
    concentration: { type: Number, require: true },
    price: { type: Number, require: true },
    comment: { type: String, default: "" },
    productID: { type: Schema.Types.ObjectId, ref: 'product' }
});

module.exports = mongoose.model('review', userSchema);