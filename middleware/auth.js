const dotEnv = require("dotenv").config();
const secretKey = process.env.secretKey;
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    let data = {};
    if (token == null) {
        data.metadata = {
            code: 401,
            msg: "Token Tidak Ditemukan",
        };
        data.response = [];
        return res.status(401).json(data);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            data.metadata = {
                code: 403,
                msg: "Token Tidak Sesuai atau token sudah kadarluwarsa",
            };
            data.response = [];
            return res.status(403).json(data);
        }

        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken,
};
