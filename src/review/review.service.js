const {
    findReviews,
    findReviewById,
    insertReview,
    deleteReview,
    editReview,
} = require("./review.repository");

const getAllReview = async () => {
    const review = await findReviews();

    if (review.length === 0) {
        throw Error("Reviews not found");
    }

    return review;
};

const getReviewById = async (id) => {
    const review = await findReviewById(id);

    if (!review) {
        throw Error("Review not found");
    }

    return review;
};

const createReview = async (newReviewData) => {
    const review = await insertReview(newReviewData);

    return review;
};

const deleteReviewById = async (id, inputUserId) => {
    await getReviewById(id);

    await deleteReview(id, inputUserId);
};

const editReviewById = async (id, reviewData) => {
    await getReviewById(id);

    const review = await editReview(id, reviewData);

    return review;
};

module.exports = {
    getAllReview,
    getReviewById,
    createReview,
    deleteReviewById,
    editReviewById,
}