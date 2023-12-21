// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Ensures the title is required
    trim: true, // Removes leading and trailing whitespaces
  },
  description: String,
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
