const { loginUser } = require("./login.repository");

const getLoginUser = async (loginUserData) => {
    const user = await loginUser(loginUserData);

    if (!user) {
        throw Error("User not found");
    }

    return user;
};

module.exports = {
    getLoginUser
}
