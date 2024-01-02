const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Routes
const taskRoutes = require('./routes/tasksApi');
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
app.use(taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
