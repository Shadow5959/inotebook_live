const express = require('express');
const app = express();
const path = require('path');
var cors = require('cors')
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



module.exports = app;