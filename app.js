require('dotenv').config();
const express = require('express');
const connectToAtlas = require('./helpers/db');
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/routes'));

connectToAtlas()
    .then(() => {
        app.listen(3000, () => {
            console.log('app.listen has been reached successfully !');
        })
    }).catch(err => {
        throw new Error(err);
    });