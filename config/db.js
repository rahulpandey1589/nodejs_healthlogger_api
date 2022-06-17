const mongoose = require('mongoose');


const connectDB = async() =>{
    console.log(`The mongo URI is ,${process.env.MONGO_URI} and port number is ${process.env.PORT}`)
    const conn = await mongoose.connect(
        process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDB Connected, ${conn.connection.host}`);

}

module.exports = connectDB;