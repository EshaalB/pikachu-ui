require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true } 
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/creatureDB')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
app.get('/', (req, res) => {
res.send('Hello from Creature Collector API');
});
const authRoutes = require('./routes/auth');
const creatureRoutes = require('./routes/creatures');
app.use('/auth', authRoutes);
app.use('/creatures', creatureRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});