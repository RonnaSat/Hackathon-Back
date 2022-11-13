const mongoose = require('mongoose')
const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    })
        .then(() => {
            console.log('Connected')
        })
        .catch((err) => {
            console.log('Err');
            console.error(err);
            process.exit(1);
        });
}