const express = require('express');
const router = express.Router();
const Product = require('../Models/productModel');
const auth = require('../Middlewares/auth');


router.post("/addProduct", auth, async (req, res) => {
    try {
        const { productName, productLocation, productQuantity, productDescription, productContacts, productImageBase64 } = req.body;
        console.log(req.body)
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

router.get('/UserGetAllID', async (req, res) => {
    try {
        const product = await Product.find({ productQuantity: { $gt: 0 } }).select({ _id: 1 });;
        if (!product) return res.status(404).send("No prduct");
        const prods = product.map(prod => prod._id)

        res.status(200).json(prods);
    } catch (err) {
        console.log(err);
    }
})

router.get('/AdminGetAllID', async (req, res) => {
    try {
        const product = await Product.find().select({ _id: 1 });;
        if (!product) return res.status(404).send("No prduct");
        const prods = product.map(prod => prod._id)

        res.status(200).json(prods);
    } catch (err) {
        console.log(err);
    }
})

router.get("/getAll", async (req, res) => {
    try {
        const product = await Product.find({ productQuantity: { $gt: 0 } });
        if (!product) return res.status(404).send("No prduct");
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
    }
})

router.get("/adminGetAll", async (req, res) => {
    try {
        const product = await Product.find();
        if (!product) return res.status(404).send("No prduct");
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
    }
})

router.get("/getByName/:productName", async (req, res) => {
    try {
        const product = await Product.find({ productName: req.params.productName });
        if (!product) return res.status(404).send("No prduct");
        res.status(200).json(product);
    } catch {
        console.log(e)
    }
})

router.get("/getByID/:ID", async (req, res) => {
    try {
        const product = await Product.findById(req.params.ID);
        if (!product) return res.status(404).send("No prduct");
        res.status(200).json(product);
    } catch {
        console.log(e)
    }
})


router.put("/updateData", auth, async (req, res) => {
    try {
        const { _id, productName, productLocation, productQuantity, productDescription, productContacts, productImageBase64 } = req.body;
        if (!(productName && productLocation && productQuantity && productDescription && productContacts && productImageBase64)) {
            return res.status(400).send("All input are required");
        }
        const oldProduct = await Product.findOne({ _id });
        const conflict = await Product.findOne({ productName, productLocation, _id: { $ne: _id } });
        if (!oldProduct) {
            return res.status(404).send("No product");
        } else if (conflict) {
            return res.status(409).send("Product conflict");
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

router.delete('/:id', auth, async (req, res) => {

    const productId = req.params.id;
    console.log(productId);
    await Product.findByIdAndDelete(productId);
    return res.status(204).send('Deleted')
    // const productIndex = Product.findById(productId);
    // console.log(productIndex._doc);
    // Product.splice(productIndex, 1);

});

module.exports = router;