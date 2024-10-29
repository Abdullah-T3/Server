const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'YOUR_CLOUD_NAME',     // Replace with your cloudinary cloud name
    api_key: 'YOUR_API_KEY',           // Replace with your cloudinary api key
    api_secret: 'YOUR_API_SECRET'      // Replace with your cloudinary api secret
});

// Get all photos for a specific car
router.get('/car/:license_plate', authenticateToken, (req, res) => {
    const carLicensePlate = req.params.license_plate;
    
    db.query(
        'SELECT * FROM CarPhotos WHERE car_license_plate = ?',
        [carLicensePlate],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
});

// Upload a new photo
router.post('/upload', authenticateToken, upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No photo provided' });
        }

        const { car_license_plate } = req.body;
        if (!car_license_plate) {
            return res.status(400).json({ error: 'Car license plate is required' });
        }

        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        // Upload to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, {
            folder: `rental_cars/${car_license_plate}`,
        });

        // Save to database
        db.query(
            'INSERT INTO CarPhotos (car_license_plate, photo_url, cloudinary_id) VALUES (?, ?, ?)',
            [car_license_plate, cloudinaryResponse.secure_url, cloudinaryResponse.public_id],
            (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Failed to save photo information' });
                }

                res.status(201).json({
                    message: 'Photo uploaded successfully',
                    url: cloudinaryResponse.secure_url,
                    photo_id: results.insertId
                });
            }
        );
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
});

// Delete a photo
router.delete('/:id', authenticateToken, async (req, res) => {
    const photoId = req.params.id;

    // First get the cloudinary_id
    db.query(
        'SELECT cloudinary_id FROM CarPhotos WHERE photo_id = ?',
        [photoId],
        async (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) {
                return res.status(404).json({ message: 'Photo not found' });
            }
            try {
                // Delete from Cloudinary
                await cloudinary.uploader.destroy(results[0].cloudinary_id);

                // Delete from database
                db.query(
                    'DELETE FROM CarPhotos WHERE photo_id = ?',
                    [photoId],
                    (err, results) => {
                        if (err) return res.status(500).send(err);
                        res.json({ message: 'Photo deleted successfully' });
                    }
                );
            } catch (error) {
                console.error('Deletion error:', error);
                res.status(500).json({ error: 'Failed to delete photo' });
            }
        }
    );
});

module.exports = router;