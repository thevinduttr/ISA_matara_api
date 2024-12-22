// routes/projectRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
    addProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');

const router = express.Router();

// Configure multer storage for project images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const projectPath = path.join(__dirname, '..', 'uploads', 'projects');
        fs.mkdirSync(projectPath, { recursive: true });
        cb(null, projectPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), addProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
