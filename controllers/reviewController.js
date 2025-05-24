const Review = require("../models/reviewModal");

const fetchReviewsByProductId = async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await Review.find({ productId });
        if (!reviews) {
            return res.status(404).json({
                data: null,
                error: false,
                message: 'No reviews found for this product'
            });
        }
        res.status(200).json({
            data: reviews,
            error: false,
            message: 'Reviews fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error fetching reviews'
        });
    }
}

// Add a new review
const addReview = async (req, res) => {
    const { orderId, productId, userId, rating, comment } = req.body;
    try {
        const newReview = new Review({
            orderId,
            productId,
            userId,
            rating,
            comment
        });
        await newReview.save();
        res.status(201).json({
            data: newReview,
            error: false,
            message: 'Review added successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error adding review'
        });
    }
}

// delete review by id
const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
            return res.status(404).json({
                data: null,
                error: true,
                message: 'Review not found'
            });
        }
        res.status(200).json({
            data: review,
            error: false,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error deleting review'
        });
    }
}
module.exports = { fetchReviewsByProductId, addReview, deleteReview };