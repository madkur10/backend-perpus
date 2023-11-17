const express = require("express");
const dotenv = require("dotenv");
const app = express();
const { authenticateToken } = require("../middleware/auth");

dotenv.config();
app.use(express.json())

const PORT = process.env.PORT;

const loginController = require('./login/login.controller');
const usersController = require('./users/users.controller');
const bookController = require('./book/book.controller');
const loanController = require('./loan/loan.controller');
const reviewController = require('./review/review.controller');

app.use('/api/login', loginController);

app.use(authenticateToken)
app.use('/api/users', usersController);
app.use('/api/book', bookController);
app.use('/api/loan', loanController);
app.use('/api/review', reviewController);

app.listen(PORT, () => {
    console.log("ExpressJs API Berjalan di PORT : " + PORT)
})