const prisma = require("../db");

const findProducts = async () => {
    const products = await prisma.product.findMany();

    return products;
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    return product;
}

const findProductByName = async (name) => {
    const product = await prisma.product.findFirst({
        where: {
            name,
        },
    });

    return product;
}

const insertProduct = async (productData) => {
    const product = await prisma.product.create({
        data: {
            name: productData.name,
            description: productData.description,
            image: productData.image,
            price: productData.price,
        },
    });

    return product;
}

const deleteProduct = async (id) => {
    await prisma.product.delete({
        where: {
            id,
        },
    });
}

const editProduct = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id,
        },
        data: {
            description: productData.description,
            name: productData.name,
            image: productData.image,
            price: productData.price,
        },
    });

    return product;
}

module.exports = {
    findProducts,
    findProductById,
    findProductByName,
    insertProduct,
    deleteProduct,
    editProduct
}