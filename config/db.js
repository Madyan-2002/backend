const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        // حذفنا useNewUrlParser و useUnifiedTopology لأنها لم تعد مدعومة يدوياً
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connect to DataBase ✅");
    }
    catch (error) {
        console.error("Cannot Connect ❌ " + error.message);
    }
}

module.exports = connectDb;
