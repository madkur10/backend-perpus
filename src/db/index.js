const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();
const prismaRawQuery = Prisma;

module.exports = { 
    prisma,
    prismaRawQuery
};