const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    try {
        const { email, pwd } = req.body;
        if (!(email && pwd)) {
            return res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(pwd, user.pwd))) {
            const token = jwt.sign(
                { user },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )
            user.token = token;
            return res.status(200).json(user.token);
        }
        res.status(400).send("Invalid Cred");
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;