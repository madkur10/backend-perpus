const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const {
    getAllLoan,
    getLoanById,
    getLoanByCheckoutDate,
    createLoan,
    deleteLoanById,
    editLoanById,
} = require("./loan.service");

router.get("/", async (req, res) => {
    try {
        const loans = await getAllLoan();
        res.send({
            code: 200,
            msg: "Operation completed successfully.",
            data: loans,
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

            const loanId = parseInt(req.params.id);
            const loan = await getLoanById(loanId);

            res.send({
                code: 200,
                msg: "Operation completed successfully.",
                data: loan,
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
    "/checkout-date",
    [
        body("startdate").isISO8601().toDate(),
        body("enddate").isISO8601().toDate(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const startDate = req.body.startdate;
            const endDate = req.body.enddate;
            const loan = await getLoanByCheckoutDate(startDate, endDate);

            res.send({
                code: 200,
                msg: "Operation completed successfully.",
                data: loan,
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
        body("input_user_id").isInt(),
        body("book_id").notEmpty().isInt(),
        body("user_id").notEmpty().isInt(),
        body("due_date")
            .notEmpty()
            .isISO8601()
            .toDate()
            .custom(async (value) => {
                const currentDate = new Date();
                if (value <= currentDate) {
                    throw new Error("The date must be greater than today.");
                }
            }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const newDataLoan = req.body;
            const loan = await createLoan(newDataLoan);

            res.send({
                code: 200,
                msg: "Create Loan Success",
                data: loan,
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

            const loanId = parseInt(req.params.id);
            const sessionUserId = parseInt(req.body.session_user_id);
            await deleteLoanById(loanId, sessionUserId);

            res.send({
                code: 204,
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
        body("mod_user_id")
            .notEmpty()
            .withMessage("mod_user_id must not empty"),
        body("book_id")
            .notEmpty()
            .withMessage("book_id must not empty")
            .isInt()
            .withMessage("mod_user_id must be integer"),
        body("user_id")
            .notEmpty()
            .withMessage("user_id must not empty")
            .isInt()
            .withMessage("user_id must be integer"),
        body("due_date")
            .notEmpty()
            .withMessage("due_date must not empty")
            .isISO8601()
            .withMessage("Due date must timestamp data tipe")
            .toDate(),
        body("return_date")
            .notEmpty()
            .withMessage("Return date must not empty")
            .isISO8601()
            .withMessage("Return date must timestamp data tipe")
            .toDate(),
        body("fine_amount")
            .notEmpty()
            .withMessage("Fine amount must not empty")
            .isInt()
            .withMessage("fine_amount must be integer"),
        body("status_payment")
            .notEmpty()
            .withMessage("status_payment must not empty"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            const loanId = parseInt(req.params.id);
            const loanData = req.body;

            const loan = await editLoanById(loanId, loanData);

            res.send({
                code: 200,
                msg: "Edit Loan Success",
                data: loan,
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
            const loanId = parseInt(req.params.id);
            const loanData = req.body;

            const loan = await editLoanById(loanId, loanData);

            res.send({
                code: 200,
                data: loan,
                msg: "Edit Loan Success",
            });
        } catch (error) {
            res.status(400).send({
                code: 400,
                msg: error.message,
            });
        }
    }
);

module.exports = router;
