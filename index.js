const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user_route');
const productRoutes = require('./routes/product_route');
const categoryRoutes = require('./routes/category_route');
const Category = require('./models/category.model');

require('dotenv').config();

const port = process.env.PORT || 3500;
const api = process.env.API_URL;

// Middleware
app.use(bodyParser.json());
app.use(`${api}/users`, userRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/category`, categoryRoutes);

// coonect to database
connectDB();


// --- 3. تشغيل السيرفر في النهاية ---
app.listen(port, () => {
    console.log(api);
    console.log(`Server is running at: http://localhost:${port}${api}/users`);
});