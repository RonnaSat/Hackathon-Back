const express = require('express');
const router = express.Router();
const Order = require('../Models/orderModel');
const Product = require('../Models/productModel');
const auth = require('../Middlewares/auth');

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
                const newProdQuantity = (productInfo.productQuantity) - 1;
                await productInfo.update({ productQuantity: newProdQuantity });

                return res.status(201).json(order);
            };
        }
        res.status(400).send("Sth Wrong");
    } catch (err) {
        console.log(err);
    }
})

router.put("/updateToReview/", auth, async (req, res) => {
    try {
        const { _id } = req.body;
        const orderInfo = await Order.findById({ _id });
        if (!orderInfo) {
            return res.status(400).send("No Order")
        } else {
            orderInfo.status = '1';
            await orderInfo.save();
            return res.status(201).send('Update to review')
        }
        res.status(404).send('Update failed')
    } catch (err) {
        console.log(err);
    }
})

router.get("/getOrder", async (req, res) => {
    try {
        const userInfoTemp = req.userInfo;
        const orderInfo = await Order.findOne({ userID: userInfoTemp._id });
        if (!orderInfo) {
            return res.status(400).send("No Order")
        } else {
            await orderInfo.populate('userID');
            await orderInfo.populate('productID');
            if (!orderInfo?.userID?.fName || !orderInfo?.productID?.productName) {
                await Order.findByIdAndDelete(orderInfo._id);
                return res.status(404).send('Order failed')
            }
            const orderDetail = {
                _id: orderInfo._id,
                orderStatus: orderInfo.status,
                fName: orderInfo.userID.fName,
                lName: orderInfo.userID.lName,
                productName: orderInfo.productID.productName,
                productDescription: orderInfo.productID.productDescription,
                productContacts: orderInfo.productID.productContacts,
                productImageBase64: orderInfo.productID.productImageBase64,
                productLocation: orderInfo.productID.productLocation,
                productPickTime: orderInfo.productPickTime

            }
            return res.status(200).json(orderDetail)
        }
    } catch (err) {
        console.log(err);
    }
})
router.delete("/deleteOrder", async (req, res) => {
    try {
        const userInfoTemp = req.userInfo;
        const orderInfo = await Order.findOne({ userID: userInfoTemp._id });
        if (!orderInfo) {
            return res.status(400).send("No Order");
        } else {
            if (orderInfo.productID) {
                const productInfo = await Product.findById(orderInfo.productID);
                const newProdQuantity = (productInfo.productQuantity) + 1;
                await productInfo.update({ productQuantity: newProdQuantity });
            }
            await Order.findByIdAndDelete(orderInfo._id);
            return res.status(204).send('Deleted')
        }
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;