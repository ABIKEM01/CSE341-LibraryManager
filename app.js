require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());

// Routes
app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));

//home route
app.get("/", (req, res) => {
  res.send("<h2>Welcome to Library Management System by Abiodun Babayode.</h2>");
});


// Start server
const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();