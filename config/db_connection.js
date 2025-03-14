const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME, })
            .then(() => console.log('MongoDB connected'))

    } catch (error) {
        console.error('MongoDB connection failed');
        console.error(error);
        process.exit(1);
    }
}

module.exports = dbConnection;