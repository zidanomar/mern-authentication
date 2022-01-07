const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());

// Configure Route
const authRoute = require('./routes/authRoute');
const privateRoute = require('./routes/privateRoute');

app.use('/auth', authRoute);
app.use('/private', privateRoute);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
