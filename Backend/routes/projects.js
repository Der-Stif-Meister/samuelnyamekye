const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new project (protected in real app)
router.post('/', async (req, res) => {
  const { title, description, imageUrl, tags, githubUrl, liveUrl } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      imageUrl,
      tags,
      githubUrl,
      liveUrl
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;