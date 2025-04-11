const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv');
const dbConnection = require('./config/db_connection');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
const addressRouter = require('./routes/addressRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// configs
env.config();
dbConnection();

// routes
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/reviews', reviewRouter);
app.use('/orders', orderRouter);
app.use('/address', addressRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});