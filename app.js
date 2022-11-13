//Import
require('dotenv').config();
require('./database').connect();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./userModel');
const auth = require('./auth')

//Routes Import
const testRoutes = require('./Routes/test');

//Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(morgan('tiny'));

//Routes
app.use('/test', auth, testRoutes);

app.post("/register", async (req, res) => {
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
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        );
        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
})
app.post("/login", async (req, res) => {
    try {
        const { email, pwd } = req.body;
        if (!(email && pwd)) {
            return res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(pwd, user.pwd))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h"
                }
            )
            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Cred");
    } catch (err) {
        console.log(err);
    }
})

module.exports = app;

//Ref
// https://www.bezkoder.com/node-js-express-login-example/
// https://www.youtube.com/watch?v=XL5SBUZU35s