const {
    findUsers,
    findUserById,
    insertUser,
    getUserByEmail,
    deleteUser,
    editUser,
} = require("./users.repository");

const getAllUsers = async () => {
    const users = await findUsers();

    if (users.length === 0) {
        throw Error("Users not found");
    }

    return users;
};

const getUserById = async (id) => {
    const user = await findUserById(id);

    if (!user) {
        throw Error("User not found");
    }

    return user;
};

const isEmailUnique = async (email) => {
    const user = await getUserByEmail(email);

    return user;
};

const createUser = async (newUserData) => {
    const user = await insertUser(newUserData);

    return user;
};

const deleteUserById = async (id, inputUserId) => {
    await getUserById(id);

    await deleteUser(id, inputUserId);
};

const editUserById = async (id, userData) => {
    await getUserById(id);

    const user = await editUser(id, userData);

    return user;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    isEmailUnique,
    deleteUserById,
    editUserById,
};
