const { prisma } = require("../db");

const loginUser = async (userData) => {
    const users = await prisma.users.findFirst({
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
            username: userData.username,
            password: userData.password,
        },
    });

    return users;
};

module.exports = {
    loginUser
}
