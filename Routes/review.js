const express = require('express');
const router = express.Router();
const Review = require('../Models/reviewModel');
const Order = require('../Models/orderModel');
const auth = require('../Middlewares/auth');
const Product = require('../Models/productModel');


router.post("/addReview", auth, async (req, res) => {
    try {
        const { orderID, fName, lName, gender, fragrance, longevity, concentration, price, comment, productName } = req.body;
        if (orderID && fName && lName && gender && fragrance && longevity && concentration && price && comment && productName) {
            const review = await Review.create({
                fName,
                lName,
                gender,
                fragrance,
                longevity,
                concentration,
                price,
                comment,
                productName
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
router.get("/getByProductName/:productName", auth, async (req, res) => {
    try {
        const productName = req.params.productName;
        const reviews = await Review.find({ productName: productName })
        if (reviews) {
            const productInfo = await Product.findOne({ productName: productName })
            if (productInfo) {
                const combineReview = {
                    productInfo,
                    reviews
                }
                return res.status(201).json(combineReview);
            }
        }
        res.status(400).send("Sth Wrong");
    } catch (err) {
        console.log(err)
    }
})




module.exports = router;