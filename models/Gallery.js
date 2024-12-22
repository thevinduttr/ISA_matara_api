const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
});

const GallerySchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    images: [ImageSchema],
});

module.exports = mongoose.model('Gallery', GallerySchema);
