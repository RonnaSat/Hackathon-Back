const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    try {
        const { fName, lName, email, pwd } = req.body;

        if (!(email && pwd && fName && lName)) {
            return res.status(400).send("All input are required");
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User already exist")
        }

        encryptedPWD = await bcrypt.hash(pwd, 10);

        const user = await User.create({
            fName,
            lName,
            email: email.toLowerCase(),
            pwd: encryptedPWD
        });

        const token = jwt.sign(
            { user },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );
        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;