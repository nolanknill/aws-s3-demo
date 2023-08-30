// Loading environment variables
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

// Middleware for allowing us to connect to this API from frontend and make post requests to it
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`🚀 App listening on ${PORT}`);
});