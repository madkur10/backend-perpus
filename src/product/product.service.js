const prisma = require("../db");
const { findProducts, findProductById, insertProduct, deleteProduct, findProductByName, editProduct } = require("./product.repository");

const getAllProducts = async () => {
    const products = await findProducts();

    return products;
};

const getProductById = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        throw Error("Product not found");
    }

    return product;
};

const createProduct = async (newProductData) => {
    const findProduct = await findProductByName(newProductData.name);

    if (findProduct) {
        throw new Error("name has to be unique");
    }

    const product = await insertProduct(newProductData);

    return product;
};

const deleteProductById = async (id) => {
    await getProductById(id);

    await deleteProduct(id);
};

const editProductById = async (id, productData) => {
    await getProductById(id);

    const product = await editProduct(id, productData);

    return product;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById,
};
