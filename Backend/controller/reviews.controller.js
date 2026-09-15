const reviewsService = require("../services/reviews.service");


// Get all approved reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewsService.getAllReviews();

        res.status(200).json({
            success: true,
            data: reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get reviews for a specific company
const getReviewsByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        const reviews = await reviewsService.getReviewsByCompany(companyId);

        res.status(200).json({
            success: true,
            data: reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Create a new review
const createReview = async (req, res) => {
    try {
        const review = await reviewsService.createReview(req.body);

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Update review
const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await reviewsService.updateReview(
            reviewId,
            req.body
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Delete review
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await reviewsService.deleteReview(reviewId);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getAllReviews,
    getReviewsByCompany,
    createReview,
    updateReview,
    deleteReview
};