const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    },
})

const upload = multer({ storage })

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html')
})
router.post('/upload', upload.single('photo'), (req, res) => {
    res.send(req.file)
})

module.exports = router;