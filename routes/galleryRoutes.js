const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
    addImage,
    getGalleryByTitle,
    deleteImage,
    deleteGallery,
    getAllGalleries, // Import the new function
} = require('../controllers/galleryController');

const router = express.Router();

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const galleryPath = path.join(__dirname, '..', 'uploads', req.body.title);
        fs.mkdirSync(galleryPath, { recursive: true });
        cb(null, galleryPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage }).array('images');

// Routes
router.post('/add-image', upload, addImage);
router.get('/:title', getGalleryByTitle);
router.delete('/:title/:imageId', deleteImage);
router.delete('/:title', deleteGallery);

// New route to get all galleries
router.get('/', getAllGalleries);

module.exports = router;
