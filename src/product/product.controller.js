const express = require("express");
const router = express.Router();
const prisma = require("../db");
const {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById,
} = require("./product.service");

router.get("/", async (req, res) => {
    const products = await getAllProducts();
    res.send(products);
});

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await getProductById(productId);

        res.send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newDataProduct = req.body;
        const product = await createProduct(newDataProduct);

        res.send({
            data: product,
            msg: "Create Product Success",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        await deleteProductById(productId);

        res.send("Products deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    const productId = parseInt(req.params.id);
    const productData = req.body;

    if (
        !(
            productData.description &&
            productData.name &&
            productData.image &&
            productData.price
        )
    ) {
        return res.status(400).send("Fields Missing");
    }

    const product = await editProductById(productId, productData);

    res.send({
        data: product,
        msg: "Edit Production Success",
    });
});

router.patch("/:id", async (req, res) => {
    const productId = parseInt(req.params.id);
    const productData = req.body;

    const product = await editProductById(productId, productData);

    res.send({
        data: product,
        msg: "Edit Product Success",
    });
});

module.exports = router;
