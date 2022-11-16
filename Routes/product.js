const express = require('express');
const router = express.Router();
const Product = require('../Models/productModel');
const imageTobase64 = require('image-to-base64');
// const imageTemp = require("../uploads/download.png");

let test;

imageTobase64("./uploads/download.png").then(
    (res) => {
        test = res;
    }
).catch((err) => {
    console.log(err);
})

router.post("/addProduct", async (req, res) => {
    try {
        const { productName, productLocation, productDescription, productContacts, productImageBase64 } = req.body;

        if (!(productName && productLocation && productDescription && productContacts && productImageBase64)) {
            return res.status(400).send("All input are required");
        }

        const oldProduct = await Product.findOne({ productName });
        if (oldProduct) {
            return res.status(409).send("Product already exist")
        }

        const product = await Product.create({
            productName,
            productLocation,
            productDescription,
            productContacts,
            productImageBase64
        });
        res.status(201).json(product);
    } catch (err) {
        console.log(err);
    }
})

router.post("/addTest", async (req, res) => {
    try {
        const productName = "b";
        const productLocation = "CNX";
        const productDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        const productContacts = ["ig", "fb", "phone", "tw"];
        const productImageBase64 = imgTemp;

        const product = await Product.create({
            productName,
            productLocation,
            productDescription,
            productContacts,
            productImageBase64
        });
        res.status(201).json(product);
    } catch (err) {
        console.log(err)
    }
})

router.post("/apiTest", async (req, res) => {
    try {
        const receive = req.body;
        console.log(receive);
        res.status(201).json(receive);
    } catch (err) {
        console.log(err)
    }
})

router.get("/get/:name", async (req, res) => {
    try {
        const productName = req.params.name;
        const product = await Product.findOne({ productName });
        const tempObject = {};
        let base64 = product.productImageBase64.toString('base64');
        tempObject.data1 = base64;
        base64 = Buffer.from(base64);
        tempObject.data2 = base64;
        res.json(tempObject);
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;