const mongoose = require('mongoose');

// Function to connect to the database
async function connectToDb() {
    const dbUrl = process.env.URI// MongoDB connection URL
    
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

// Function to close the database connection
async function closeDbConnection() {
    try {
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
    }
}

module.exports = {connectToDb, closeDbConnection};
