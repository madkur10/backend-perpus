const { prisma } = require("../db");

const findUsers = async () => {
    const users = await prisma.users.findMany({
        select: {
            id: true,
            input_time: true,
            input_user_id: true,
            first_name: true,
            last_name: true,
            birthdate: true,
            username: true,
            email: true,
            role: true,
            active: true,
        },
        where: {
            deleted_user_id: null,
        },
    });

    return users;
};

const findUserById = async (id) => {
    const user = await prisma.users.findUnique({
        select: {
            id: true,
            input_time: true,
            input_user_id: true,
            first_name: true,
            last_name: true,
            birthdate: true,
            username: true,
            email: true,
            role: true,
            active: true,
        },
        where: {
            deleted_user_id: null,
            id,
        },
    });

    return user;
};

const getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        select: {
            id: true,
        },
        where: {
            email,
            deleted_user_id: null,
        },
    });

    return user;
};

const insertUser = async (userData) => {
    const user = await prisma.users.create({
        data: {
            input_time: new Date(),
            input_user_id: userData.input_user_id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            birthdate: new Date(userData.birthdate),
            username: userData.username,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            active: userData.active,
        },
    });

    return user;
};

const deleteUser = async (id, inputUserId) => {
    const user = await prisma.users.update({
        where: {
            id,
        },
        data: {
            deleted_time: new Date(),
            deleted_user_id: inputUserId,
        },
    });

    return user;
};

const editUser = async (id, userData) => {
    let birthdate;
    if (userData.birthdate) {
        birthdate = new Date(userData.birthdate);
    }
    const user = await prisma.users.update({
        where: {
            id,
        },
        data: {
            mod_time: new Date(),
            mod_user_id: userData.mod_user_id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            birthdate: birthdate,
            username: userData.username,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            active: userData.active,
        },
    });

    return user;
};

module.exports = {
    findUsers,
    findUserById,
    getUserByEmail,
    insertUser,
    deleteUser,
    editUser,
};
