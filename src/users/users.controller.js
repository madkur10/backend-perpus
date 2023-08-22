const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const {
    getAllUsers,
    getUserById,
    createUser,
    isEmailUnique,
    deleteUserById,
    editUserById,
} = require("./users.service");

router.get("/", async (req, res) => {
    const products = await getAllUsers();
    res.send(products);
});

router.get(
    "/:id",
    [param("id").isInt().withMessage("Id must be integer")],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const userId = parseInt(req.params.id);
            const user = await getUserById(userId);

            res.send(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
);

router.post(
    "/",
    [
        body("input_user_id").isInt().notEmpty(),
        body("first_name").notEmpty(),
        body("last_name").notEmpty(),
        body("birthdate").isISO8601().toDate(),
        body("username")
            .notEmpty()
            .isLength({ min: 5, max: 20 })
            .withMessage("Username must be between 5 and 20 characters"),
        body("email")
            .isEmail()
            .custom(async (value) => {
                const userExist = await isEmailUnique(value);
                if (userExist) {
                    throw new Error(
                        "A user already exists with this e-mail address"
                    );
                }
            })
            .withMessage("Email is already in use"),
        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d~!@#$%^&*,.]+$/
            )
            .withMessage(
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
            ),
        body("role")
            .isIn(["admin", "member"])
            .withMessage('Role must be either "admin" or "member"'),
        body("active").isBoolean(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const newDataUser = req.body;
            const user = await createUser(newDataUser);

            res.send({
                data: user,
                msg: "Create User Success",
            });
        } catch (error) {
            res.status(400).send(error.message);
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

            const userId = parseInt(req.params.id);
            const sessionUserId = parseInt(req.body.session_user_id);
            await deleteUserById(userId, sessionUserId);

            res.send("User deleted");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
);

router.put(
    "/:id",
    [
        param("id").isInt().withMessage("Id must be integer"),
        body("mod_user_id").isInt(),
        body("first_name").notEmpty(),
        body("last_name").notEmpty(),
        body("birthdate").isISO8601().toDate(),
        body("username")
            .notEmpty()
            .isLength({ min: 5, max: 20 })
            .withMessage("Username must be between 5 and 20 characters"),
        body("email").isEmail(),
        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d~!@#$%^&*,.]+$/
            )
            .withMessage(
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
            ),
        body("role")
            .isIn(["admin", "member"])
            .withMessage('Role must be either "admin" or "member"'),
        body("active").isBoolean(),
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
                data: user,
                msg: "Edit User Success",
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
);

router.patch(
    "/:id",
    param("id").isInt().withMessage("Id must be integer"),
    body("mod_user_id").isInt(),
    async (req, res) => {
        const userId = parseInt(req.params.id);
        const userData = req.body;

        const user = await editUserById(userId, userData);

        res.send({
            data: user,
            msg: "Edit User Success",
        });
    }
);

module.exports = router;
