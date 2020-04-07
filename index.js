const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// multer setting
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myupload')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
   
var upload = multer({
    storage: storage,
}).single('profilepic');


// set up ejs
app.set('view engine', 'ejs');

// static folder
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/local', (req, res) => {
    res.render('local')
})

// Post image route
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                message: err
            })
        } else{
            res.render('index', {
                message: 'Successfully uploaded...',
                filename: `myupload/${req.file.filename}`
            })
        }
    })
})





app.listen(port, () => {
    console.log(`Server is running on localhost at port: ${port}`);
})