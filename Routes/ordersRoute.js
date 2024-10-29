const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig'); // Import Cloudinary config

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Get all orders (Protected)
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Orders', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});// Add a new order (Protected)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const { 
    customer_name, 
    customer_mobile, 
    car_license_plate, 
    car_name, 
    rental_date, 
    rental_days, 
    rental_amount, 
    car_km_at_rental 
  } = req.body;

  try {
    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload_stream({ 
      resource_type: 'auto' 
    }, (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Image upload failed' });
      }
      return result;
    });

    // Pipe the file buffer to Cloudinary
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Image upload failed' });
      }
      // Save the order with the Cloudinary image URL
      db.query(
        'INSERT INTO Orders (customer_name, customer_mobile, car_license_plate, car_name, rental_date, rental_amount, rental_days, car_km_at_rental, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [customer_name, customer_mobile, car_license_plate, car_name, rental_date, rental_amount, rental_days, car_km_at_rental, result.secure_url], // Use the Cloudinary URL
        (err, results) => {
          if (err) return res.status(500).send(err);
          res.status(201).send('Order created');
        }
      );
    });

    // Write the file buffer to the stream
    stream.end(req.file.buffer);

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Delete an order (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  db.query('DELETE FROM Orders WHERE order_id = ?', [orderId], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.send('Order deleted');
  });
});

module.exports = router;
