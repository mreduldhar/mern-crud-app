const express = require('express');
const router = require('./src/routes/api');
const app = new express();
require('dotenv').config()

// Security Middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');
const cors = require('cors');

// Database lib import
const mongoose = require('mongoose');

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(express.json())

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3000  
});
app.use(limiter)

// Database Connection
 let URI = process.env.DB_URI;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database has been Connected!')
    } catch (error) {
        console.log('Database has not been Connected!', error)
    }
}

connectToDatabase();

// Managing Backend Routing Implement
app.use('/api/v1',router);

module.exports=app;



