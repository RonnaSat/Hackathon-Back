const express = require('express');
const router = express.Router();
const Review = require('../Models/reviewModel');
const Order = require('../Models/orderModel');
const auth = require('../Middlewares/auth');

router.post("/addReview", auth, async (req, res) => {
    try {
        const { orderID, fName, lName, gender, fragrance, longevity, concentration, price, comment, productID } = req.body;
        if (orderID && fName && lName && gender && fragrance && longevity && concentration && price && comment && productID) {
            const review = await Review.create({
                fName,
                lName,
                gender,
                fragrance,
                longevity,
                concentration,
                price,
                comment,
                productID
            });
            if (review) {
                await Order.findByIdAndDelete(orderID);
            }
            return res.status(201).json(review);
        }
        res.status(400).send("Sth Wrong");
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;