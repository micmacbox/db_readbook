// require('dotenv').config();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const {PORT, MONGO_URI} = process.env;

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('connected to db sucessfully'))
.catch(e=>console.log('error', e));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
});
app.use('/borrows', require('./routes/borrows'));

app.listen(PORT, ()=>{
    console.log('server listening on', MONGO_URI);
})