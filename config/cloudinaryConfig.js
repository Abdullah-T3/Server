const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,       // replace with your API key
  api_secret: process.env.api_secret,   // replace with your API secret
});

module.exports = cloudinary;
