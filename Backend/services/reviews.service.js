const { reviewModel } = require("../models/reviews.model");


// Get all approved reviews
const getAllReviews = async () => {
    return await reviewModel.find({
        moderationStatus: "Approved"
    });
};


// Get reviews for a specific company
const getReviewsByCompany = async (companyId) => {
    return await reviewModel.find({
        companyId: companyId,
        moderationStatus: "Approved"
    });
};


// Create a new review
const createReview = async (reviewData) => {
    const review = new reviewModel(reviewData);

    return await review.save();
};


// Update review
const updateReview = async (reviewId, updateData) => {
    return await reviewModel.findByIdAndUpdate(
        reviewId,
        updateData,
        { new: true }
    );
};


// Delete review
const deleteReview = async (reviewId) => {
    return await reviewModel.findByIdAndDelete(reviewId);
};


module.exports = {
    getAllReviews,
    getReviewsByCompany,
    createReview,
    updateReview,
    deleteReview
};