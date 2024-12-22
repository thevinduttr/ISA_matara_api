// models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    date: { type: Date, required: true },
    imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Project', ProjectSchema);
