const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 16; // عدد جولات التشفير لكلمة المرور



const professionalProfileSchema = new mongoose.Schema({ 

    targetTrack: { 
        type: String 
    },

    experienceLevel: { 
        type: String 
    },

    preferredLocations: { 
        type: [String] 
    },

    preferredJobTypes: {
        type: [String] 
    },

    resumeLink: {
        type: String 
    }

}, { _id: false }); // منع إنشاء _id مستقل للـ professionalProfile


const activitiesSchema = new mongoose.Schema({ 

    followedCompanies: {
        type: [mongoose.Schema.Types.ObjectId] // Array من IDs
    },

    savedJobs: {
        type: [mongoose.Schema.Types.ObjectId] // Array من IDs
    },

    applications: { 
        type: [mongoose.Schema.Types.ObjectId] // Array من IDs
    }

}, { _id: false }); // منع إنشاء _id مستقل للـ activities


const userSchema = new mongoose.Schema({ // إنشاء Schema الرئيسي الخاص بالـ User

    name: {
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    password: {
        type: String, 
        required: true 
    },

    role: { // دور المستخدم داخل النظام
        type: String, 
        enum: ["JobSeeker", "Employer", "Admin"], // القيم المسموح بها
        default: "JobSeeker" // القيمة الافتراضية
    },

    professionalProfile: {
        type: professionalProfileSchema 
    },

    skills: { 
        type: [mongoose.Schema.Types.ObjectId] // Array من IDs للمهارات
    },

    activities: {
        type: activitiesSchema
    }

}, { timestamps: true }); // إنشاء createdAt و updatedAt تلقائيًا

userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);

});


const userModel = mongoose.model("users", userSchema); // إنشاء Model اسمه User وربطه بالـ users collection


module.exports = { userModel }; 