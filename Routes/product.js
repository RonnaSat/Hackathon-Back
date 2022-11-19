const express = require('express');
const router = express.Router();
const Product = require('../Models/productModel');
const auth = require('../Middlewares/auth');


router.post("/addProduct", auth, async (req, res) => {
    try {
        const { productName, productLocation, productQuantity, productDescription, productContacts, productImageBase64 } = req.body;

        if (!(productName && productLocation && productQuantity && productDescription && productContacts && productImageBase64)) {
            return res.status(400).send("All input are required");
        }

        const oldProduct = await Product.findOne({ productName, productLocation });
        if (oldProduct) {
            return res.status(400).send("Product already exist")
        }

        const product = await Product.create({
            productName,
            productLocation,
            productQuantity,
            productDescription,
            productContacts,
            productImageBase64
        });
        res.status(201).json(product);
    } catch (err) {
        console.log(err);
    }
})


router.get("/getAll", async (req, res) => {
    try {
        const product = await Product.find({ productQuantity: { $gt: 1 } });
        if (!product) return res.status(404).send("No prduct");
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
    }
})


router.put("/updateData", auth, async (req, res) => {
    try {
        const { _id, productName, productLocation, productQuantity, productDescription, productContacts, productImageBase64 } = req.body;
        if (!(productName && productLocation && productQuantity && productDescription && productContacts && productImageBase64)) {
            return res.status(400).send("All input are required");
        }
        const oldProduct = await Product.findOne({ _id });
        if (!oldProduct) {
            return res.status(404).send("No prduct");
        } else {
            const newData = {
                productName,
                productLocation,
                productQuantity,
                productDescription,
                productContacts,
                productImageBase64
            }
            await oldProduct.update(newData);
            return res.status(200).send('Updated');
        }

    } catch (err) {
        console.log(err);
    }
})


module.exports = router;