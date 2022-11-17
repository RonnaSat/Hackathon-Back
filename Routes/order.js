const express = require('express');
const router = express.Router();
const Order = require('../Models/orderModel');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');


router.post("/addOrder", async (req, res) => {
    try {
        const { productName, productLocation, productPickTime } = req.body;
        const userInfoTemp = req.userInfo;
        const productInfo = await Product.findOne({ productName: productName, productLocation: productLocation });
        if (!productInfo) return res.status(400).send("Product not found");
        const orderflag = await Order.findOne({ userID: userInfoTemp._id })
        if (orderflag) return res.status(400).send("Already add");
        if (!orderflag) {
            if (userInfoTemp && productInfo && productPickTime) {
                const order = await Order.create({
                    userID: userInfoTemp._id,
                    productID: productInfo._id,
                    productPickTime
                });
                return res.status(201).json(order);
            };
        }
        res.status(400).send("Sth Wrong");
    } catch (err) {
        console.log(err);
    }
})

router.get("/getOrder", async (req, res) => {
    try {

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