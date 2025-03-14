const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv');
const dbConnection = require('./config/db_connection');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// configs
env.config();
dbConnection();

// routes
app.use('/users', userRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});