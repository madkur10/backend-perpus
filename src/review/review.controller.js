const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const {
    getAllReview,
    getReviewById,
    createReview,
    deleteReviewById,
    editReviewById,
} = require("./review.service");

router.get("/", async (req, res) => {
    try {
        const reviews = await getAllReview();
        res.send({
            code: 200,
            msg: "Operation completed successfully.",
            data: reviews,
        });
    } catch (error) {
        res.status(400).send({
            code: 400,
            msg: error.message,
        });
    }
});

router.get(
    "/:id",
    [param("id").isInt().withMessage("Id must be a numeric")],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const reviewId = parseInt(req.params.id);
            const review = await getReviewById(reviewId);

            res.send({
                code: 200,
                msg: "Operation completed successfully.",
                data: review,
            });
        } catch (error) {
            res.status(400).send({
                code: 400,
                msg: error.message,
            });
        }
    }
);

router.post(
    "/",
    [
        body("input_user_id")
            .isInt()
            .withMessage("input_user_id must be integer")
            .notEmpty()
            .withMessage("input_user_id must not empty"),
        body("book_id")
            .notEmpty()
            .withMessage("book_id must not empty")
            .notEmpty()
            .withMessage("book_id must be integer"),
        body("user_id")
            .notEmpty()
            .withMessage("user_id must not empty")
            .notEmpty()
            .withMessage("user_id must be integer"),
        body("rating")
            .notEmpty()
            .withMessage("rating must not empty")
            .notEmpty()
            .withMessage("rating must be integer")
            .custom((value) => {
                if (value >= 5) {
                    throw new Error("Nilai harus kurang dari 5");
                }
                return true;
            }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const newDataReview = req.body;
            const review = await createReview(newDataReview);

            res.send({
                code: 201,
                msg: "Create Review Success",
                data: review,
            });
        } catch (error) {
            res.status(400).send({
                code: 400,
                msg: error.message,
            });
        }
    }
);

router.patch(
    "/delete/:id",
    [
        param("id").isInt().withMessage("Id must be integer"),
        body("session_user_id")
            .isInt()
            .withMessage("Session user id must be integer"),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const reviewId = parseInt(req.params.id);
            const sessionUserId = parseInt(req.body.session_user_id);
            await deleteReviewById(reviewId, sessionUserId);

            res.send({
                code: 200,
                msg: "The resource has been successfully deleted",
            });
        } catch (error) {
            res.status(400).send({
                code: 400,
                msg: error.message,
            });
        }
    }
);

router.put(
    "/:id",
    [
        param("id").isInt().withMessage("Id must be integer"),
        body("mod_user_id").notEmpty(),
        body("title").notEmpty(),
        body("author").notEmpty(),
        body("publication_year").isInt(),
        body("isbn").isISBN(),
        body("page_count").isInt(),
        body("publisher").notEmpty(),
        body("genre").notEmpty(),
        body("synopsis").optional({ nullable: true }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            const bookId = parseInt(req.params.id);
            const bookData = req.body;

            const book = await editBookById(bookId, bookData);

            res.send({
                code: 200,
                msg: "The resource has been successfully updated.",
                data: book,
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
);

router.patch(
    "/:id",
    [
        body("mod_user_id").notEmpty(),
        param("id").isInt().withMessage("Id must be integer"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            const userId = parseInt(req.params.id);
            const userData = req.body;

            const user = await editUserById(userId, userData);

            res.send({
                code: 200,
                msg: "The resource has been successfully updated.",
                data: user,
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
);

module.exports = router;
