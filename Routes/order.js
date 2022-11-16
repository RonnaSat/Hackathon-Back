const express = require('express');
const router = express.Router();
const Order = require('../Models/orderModel');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');


router.post("/addOrder", async (req, res) => {
    try {
        const { email, productName, productPickTime } = req.body;
        const userInfo = await User.findOne({ email });
        const productInfo = await Product.findOne({ productName });
        if (userInfo && productInfo && productPickTime) {
            const order = await Order.create({
                userID: userInfo._id,
                productID: productInfo._id,
                productPickTime
            });
            return res.status(201).json(order);
        };
        res.status(400).send("Sth Wrong");
    } catch (err) {
        console.log(err);
    }
})

// router.get("/getTest", async (req, res) => {
//     try {
//         const { email } = req.body;
//         const userInfo = await User.findOne({ email });
//         const userID = userInfo._id;
//         const order = await Order.findOne({ userinfo: userID });
//         console.log(order);
//         const
//         const orderDetail ={

//         }
//         return res.status(200).json(order);
//     } catch (err) {
//         console.log(err);
//     }
// });

module.exports = router;