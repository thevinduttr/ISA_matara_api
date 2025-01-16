const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config');
const galleryRoutes = require('./routes/galleryRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(bodyParser.json());

// Improved CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Allow front-end origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));

// Use auth routes
app.use('/api', authRoutes);

// Routes
app.use('/api/gallery', galleryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
