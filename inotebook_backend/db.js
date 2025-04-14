const mongoose = require('mongoose');   
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.error("Could not connect to MongoDB", err));

}


module.exports = connectToMongo;