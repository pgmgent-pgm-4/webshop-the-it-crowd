import { convertArrayToPagedObject, handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all reviews
*/
const getReviews = async (req, res, next) => {
	try {
		// Get query parameters
		const { itemsPerPage, currentPage } = req.query;

		// Get reviews from database
		let reviews = null;
		if (itemsPerPage && currentPage) {
			reviews = await database.Review.findAll({
				offset: (currentPage - 1) * itemsPerPage,
				limit: itemsPerPage,
			});
			reviews = convertArrayToPagedObject(reviews, itemsPerPage, currentPage, await database.Review.count());
		} else {
			reviews = await database.Review.findAll();
		}

    

    if (!reviews || reviews.length === 0) {
      throw new HTTPError(`Could not found reviews!`, 404);
    }

		// Send response
		res.status(200).json(reviews);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific review
*/
const getReviewById = async (req, res, next) => {
	try {
		// Get reviewId parameter
		const { reviewId } = req.params;
		// Get specific review from database
		const review = await database.Review.findByPk(reviewId);

		if (review === null) {
			throw new HTTPError(`Could not found the review with id ${reviewId}!`, 404);
		}
		// Send response
		res.status(200).json(review);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new review
*/
const createReview = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Review.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting review
*/
const updateReview = async (req, res, next) => {
	try {
		// Get reviewId parameter
		const { reviewId } = req.params;
		console.log(reviewId);
		// Get specific review from database
		const review = await database.Review.findByPk(reviewId);

		if (review === null) {
			throw new HTTPError(`Could not found the review with id ${reviewId}!`, 404);
		}

		// Update a specific post
		const model = req.body;
		const updatedPost = await database.Review.update(model, {
			where: {
				id: reviewId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting review
*/
const deleteReview = async (req, res, next) => {
	try {
		// Get reviewId parameter
		const { reviewId } = req.params;
		// Get specific review from database
		const review = await database.Review.findByPk(reviewId);

		if (review === null) {
			throw new HTTPError(`Could not found the review with id ${reviewId}!`, 404);
		}

		// Delete a review with specified id
		const message = await database.Review.destroy({
			where: {
				id: reviewId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	createReview, deleteReview, getReviewById, getReviews, updateReview,
};
