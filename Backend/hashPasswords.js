const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/users.model'); // عدلي المسار حسب مكان الموديل عندك

async function run() {
    try {
        // 1. الاتصال بالداتا بيز
        await mongoose.connect('mongodb://localhost:27017/techmap_egypt_db');
        console.log('Connected to Database...');

        // 2. قراءة كل المستخدمين
        const users = await User.userModel.find({});
        let updatedCount = 0;

        for (let user of users) {
            // التشييك إن الباسورد مش معموله هاش بالفعل بـ bcrypt
            if (!user.password.startsWith('$2b$') && !user.password.startsWith('$2a$')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                await user.save();
                updatedCount++;
            }
        }

        console.log(` Done! Hashed ${updatedCount} passwords successfully.`);
    } catch (error) {
        console.error(' Error hashing passwords:', error);
    } finally {
        // 3. إغلاق الاتصال بعد الانتهاء
        await mongoose.disconnect();
        process.exit();
    }
}

run();