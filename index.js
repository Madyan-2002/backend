const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user_route');

require('dotenv').config();

const port = process.env.PORT || 3500;
const api = process.env.API_URL;

// Middleware
app.use(bodyParser.json());
app.use(`${api}/users`, userRoutes);

// coonect to database
connectDB();


// --- 3. تشغيل السيرفر في النهاية ---
app.listen(port, () => {
    console.log(api);
    console.log(`Server is running at: http://localhost:${port}${api}/users`);
});