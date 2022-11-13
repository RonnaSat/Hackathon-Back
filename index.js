//Import
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(morgan('tiny'));

//Listen
app.listen(8000, () => {
    console.log('Listening on port 8000');
});