const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const emojiRouter = require('./routers/emojiRouter.js');
const cartRouter = require('./routers/cartRouter.js');


// const emojiController = require('./controllers/emojiController');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

const PORT = process.env.PORT;

// connect to Atlas Database
const mongoURI = process.env.ATLAS_URI;
mongoose.connect(mongoURI);

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../client')))

if (process.env.NODE_ENV === 'development') {
    app.get('/', (req, res) => {
        return res.status(200).send('Hello World. :)');
    });
}



app.use('/emojis', emojiRouter);

app.use('/cart', cartRouter);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../index.html'), function (err) {
//         if (err) {
//             res.status(500).send(err);
//         }
//     });
// });

app.use((req, res) => {
    res.status(404).send('Requested URL not found.');
});

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Error occurred',
        status: 400,
        message: { err: 'An error has occurred.' }
    };
    const errObj = Object.assign(defaultErr, err);
    console.log(errObj);
    return res.status(errObj.status).send(errObj.message);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});