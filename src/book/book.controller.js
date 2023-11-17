const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { getAllBook, getBookById, createBook, deleteBookById, getBookByTitle } = require("./book.service");

router.get("/", async (req, res) => {
    try {
        const books = await getAllBook();
        res.send({
            code: 200,
            msg: 'Operation completed successfully.',
            data: books
        });
    } catch (error) {
        res.status(400).send({
            code: 400,
            msg: error.message
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

            const bookId = parseInt(req.params.id);
            const book = await getBookById(bookId);

            res.send({
                code: 200,
                msg: 'Operation completed successfully.',
                data: book
            });
        } catch (error) {
            res.status(400).send({
                code: 400,
                msg: error.message
            });
        }
    }
);

router.get(
    "/title/:title",
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const title = req.params.title;
            const book = await getBookByTitle(title);

            res.send({
                code: 200,
                msg: 'Operation completed successfully.',
                data: book
            });
        } catch (error) {
            res.status(400).send({
                code: 400,
                msg: error.message
            });
        }
    }
);

router.post(
    "/",
    [
        body("input_user_id").isInt().notEmpty(),
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
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const newDataBook = req.body;
            const book = await createBook(newDataBook);

            res.send({
                code: 201,
                msg: "Create Book Success",
                data: book,
            });
        } catch (error) {
            res.status(400).send({
                code: 400,
                msg: error.message
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

            const bookId = parseInt(req.params.id);
            const sessionUserId = parseInt(req.body.session_user_id);
            await deleteBookById(bookId, sessionUserId);

            res.send({
                code: 200,
                msg: "The resource has been successfully deleted",
            });
        } catch (error) {
            res.status(400).send({
                code: 400,
                msg: error.message
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
