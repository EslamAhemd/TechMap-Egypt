const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
    {
        overall: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },

        workEnvironment: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },

        techStack: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },

        careerGrowth: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        }
    },
    { _id: false }
);


const reviewSchema = new mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        userName: {
            type: String,
            required: true
        },

        userImage: {
            type: String
        },

        rating: {
            type: ratingSchema,
            required: true
        },

        reviewText: {
            type: String,
            required: true
        },

        moderationStatus: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "reviews"
    }
);


const reviewModel = mongoose.model("Review", reviewSchema);


module.exports = { reviewModel };