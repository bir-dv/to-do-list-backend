const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');



dotenv.config();

const app = express();
// Enable CORS for all routes use this for production
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));

// app.use(cors()); // Don't do this in production without restrictions this is only for development

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);


app.get('/test', (req, res) => {
    res.send('✅ Test route working');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
