const express = require("express");

const {
    getAllReviews,
    getReviewsByCompany,
    createReview,
    updateReview,
    deleteReview
} = require("../controller/reviews.controller.js");


const router = express.Router();

// Get all approved reviews
router.get("/", getAllReviews);

// Get reviews for a specific company
router.get("/company/:companyId", getReviewsByCompany);

// Create a new review
router.post("/", createReview);

// Update a review
router.put("/:reviewId", updateReview);

// Delete a review
router.delete("/:reviewId", deleteReview);

module.exports = {
    reviewRouter: router
};