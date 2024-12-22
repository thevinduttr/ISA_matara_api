// controllers/projectController.js
const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// Add a new project
exports.addProject = async (req, res) => {
    try {
        const { title, details, date } = req.body;
        const image = req.file;

        const project = new Project({
            title,
            details,
            date,
            imageUrl: `/uploads/projects/${image.filename}`,
        });

        await project.save();
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
    try {
        const { title, details, date } = req.body;
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        project.title = title || project.title;
        project.details = details || project.details;
        project.date = date || project.date;

        if (req.file) {
            // Delete old image
            fs.unlinkSync(path.join(__dirname, '..', project.imageUrl));
            project.imageUrl = `/uploads/projects/${req.file.filename}`;
        }

        await project.save();
        res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Delete image file
        fs.unlinkSync(path.join(__dirname, '..', project.imageUrl));
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
