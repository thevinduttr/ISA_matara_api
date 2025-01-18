const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

// Add New Gallery or Add Image to Existing Gallery
exports.addImage = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) throw new Error('Gallery title is required.');

        let gallery = await Gallery.findOne({ title });
        if (!gallery) {
            gallery = new Gallery({ title, images: [] });
        }

        req.files.forEach((image) => {
            const imagePath = `/uploads/${title}/${image.filename}`;
            gallery.images.push({ url: imagePath, title });
        });

        await gallery.save();
        res.status(200).json({ message: 'Images added to gallery', gallery });
    } catch (error) {
        console.error('Error in addImage:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Get All Images by Title
exports.getGalleryByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const gallery = await Gallery.findOne({ title });
        if (!gallery) return res.status(404).json({ message: 'Gallery not found' });
        res.status(200).json(gallery);
    } catch (error) {
        console.error('Error in getGalleryByTitle:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Delete Specific Image by Title and Image ID
exports.deleteImage = async (req, res) => {
    try {
        const { title, imageId } = req.params;
        const gallery = await Gallery.findOne({ title });

        if (!gallery) return res.status(404).json({ message: 'Gallery not found' });

        const imageIndex = gallery.images.findIndex((img) => img._id.toString() === imageId);
        if (imageIndex === -1) return res.status(404).json({ message: 'Image not found' });

        const [removedImage] = gallery.images.splice(imageIndex, 1);
        const imagePath = path.resolve(__dirname, '..', removedImage.url);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

        await gallery.save();
        res.status(200).json({ message: 'Image deleted', gallery });
    } catch (error) {
        console.error('Error in deleteImage:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Delete Entire Gallery by Title
exports.deleteGallery = async (req, res) => {
    try {
        const { title } = req.params;
        const gallery = await Gallery.findOneAndDelete({ title });

        if (!gallery) return res.status(404).json({ message: 'Gallery not found' });

        const galleryPath = path.resolve(__dirname, '..', 'uploads', title);
        if (fs.existsSync(galleryPath)) fs.rmdirSync(galleryPath, { recursive: true });

        res.status(200).json({ message: 'Gallery deleted' });
    } catch (error) {
        console.error('Error in deleteGallery:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Get All Galleries
exports.getAllGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.find();
        res.status(200).json(galleries);
    } catch (error) {
        console.error('Error in getAllGalleries:', error.message);
        res.status(500).json({ message: error.message });
    }
};
