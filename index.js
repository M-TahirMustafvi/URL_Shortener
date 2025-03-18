require('dotenv').config(); // loading enviornment Config
const express = require('express');
const urlRoutes = require('./Routes/urlRoutes');
const db = require('./Config/db');

const app = express();
const PORT = process.env.PORT;

//Middleware AND Routes
app.use(express.json());
app.use('/shorten', urlRoutes);

//Listen at given port
app.listen(PORT, async () => {
    try {
        await db.sync();
        console.log(`Database connected & Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
});
