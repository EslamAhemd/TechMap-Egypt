const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({ // إنشاء Schema يحدد شكل الـ Notification

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    type: {
        type: String, 
        required: true 
    },

    title: { 
        type: String, 
        required: true 
    },

    message: { 
        type: String, 
        required: true 
    },

    actionLink: { 
        type: String 
    },

    relatedEntityId: { // ID الخاص بالـ Entity المرتبط بالـ Notification
        type: mongoose.Schema.Types.ObjectId // نوع البيانات ObjectId
    },

    isRead: { 
        type: Boolean, 
        default: false 
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    }

}, 
{
    collection: "notifications" 
});



const notificationModel = mongoose.model( "Notification", notificationSchema );


module.exports = { notificationModel }; // تصدير الـ Model لاستخدامه في Controller