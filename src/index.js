const express = require("express");
const dotenv = require("dotenv");
const app = express();
const { authenticateToken } = require("../middleware/auth");

dotenv.config();
app.use(express.json())

const PORT = process.env.PORT;

app.get("/api", (req, res) => {
    res.send("Hello World");
})

const usersController = require('./users/users.controller');
const loginController = require('./login/login.controller');

app.use('/api/login', loginController);

app.use('/api/users', authenticateToken, usersController);

app.listen(PORT, () => {
    console.log("ExpressJs API Berjalan di PORT : " + PORT)
})