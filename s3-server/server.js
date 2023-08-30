// Loading environment variables
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const s3Routes = require("./routes/s3");
const galleryRoutes = require("./routes/gallery");

// Middleware for allowing us to connect to this API from frontend and make post requests to it
app.use(express.json());
app.use(cors());

app.use("/s3", s3Routes);
app.use("/gallery", galleryRoutes);

app.listen(PORT, () => {
  console.log(`🚀 App listening on ${PORT}`);
});