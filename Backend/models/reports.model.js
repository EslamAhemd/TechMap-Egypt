const mongoose = require("mongoose");


const reportSchema = new mongoose.Schema(
    {
        reportedByUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        targetType: {
            type: String,
            required: true,
            enum: ["Company", "Opportunity", "Review"]
        },

        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        reportType: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Open", "Resolved", "Rejected"],
            default: "Open"
        },

        adminNotes: {
            type: String,
            default: ""
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "reports"
    }
);


const reportModel = mongoose.model("Report", reportSchema);


module.exports = { reportModel };