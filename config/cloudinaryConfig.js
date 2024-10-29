require('dotenv').config(); // Load environment variables

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'da7lxmvto',
  api_key: '789574131671218',
  api_secret:'EapfhDJcqNhgsOs5-1QJ2rPSjrw',
});

module.exports = cloudinary;