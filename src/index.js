require('dotenv').config();
const morgan = require("morgan")
const express = require('express');
const app = express();
const fileUp = require('express-fileupload');

// file upload lauch
app.use(fileUp())
// app uses json
app.use(express.json())
// urlencoded plugin launched
app.use(express.urlencoded({ extended: true }));
// morgan logs
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// routes executes
app.use('/api', require('./routes'))
// error handling
app.use(require('./utils/errorCallback'));


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server run on port ${process.env.PORT}`);
});

