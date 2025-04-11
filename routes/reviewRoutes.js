const express = require('express');
const { fetchReviewsByProductId, addReview, deleteReview } = require('../controllers/reviewController');

const reviewRouter = express.Router();


reviewRouter.get('/get/:productId', fetchReviewsByProductId)
reviewRouter.post('/add', addReview)
reviewRouter.delete('/delete/:reviewId', deleteReview)

module.exports = reviewRouter;