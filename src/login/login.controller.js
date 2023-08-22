const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { getLoginUser } = require("./login.service");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv").config();
const secretKey = process.env.secretKey;

router.post(
    "/",
    [body("username").notEmpty(), body("password").notEmpty()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const loginUserData = req.body;
            const user = await getLoginUser(loginUserData);
            let token;

            if (user) {
                token = jwt.sign(
                    { id: user.id, username: user.username },
                    secretKey,
                    {
                        expiresIn: "1h",
                    }
                );
                res.cookie("jwt", token, {
                    expiresIn: "1h",
                    httpOnly: true,
                });
            }

            res.send({
                data: user,
                token: token,
                msg: "Login Berhasil!",
            });
        } catch (error) {
            res.status(400).json({
                msg: "Login Gagal!",
                error: error.message,
            });
        }
    }
);

module.exports = router;
