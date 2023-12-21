const express = require('express');
const router=express.Router()
const Task = require('../models/Task'); 


// Routes

// Create a task
router.post('/tasks', async function (req, res) {
  try {
    const { title, description } = req.body;

    if (!title) {
      // If title is empty, send a 400 Bad Request response
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation error
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});
// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    // Extract relevant details for a more meaningful response
    const simplifiedTasks = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
    }));
    res.json(simplifiedTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task by ID
router.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/tasks', async (req, res) => {
  try {
    // Delete all tasks in the database
    const result = await Task.deleteMany({});
    res.json({ message: `Deleted ${result.deletedCount} tasks` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports=router;