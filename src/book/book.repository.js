const { prisma } = require("../db");

const findBooks = async () => {
    const books = await prisma.book.findMany({
        where: {
            deleted_user_id: null,
        },
    });

    return books;
};

const findBookById = async (id) => {
    const book = await prisma.book.findUnique({
        select: {
            id: true,
            input_time: true,
            input_user_id: true,
            title: true,
            author: true,
            publication_year: true,
            isbn: true,
            page_count: true,
            publisher: true,
            genre: true,
            synopsis: true,
        },
        where: {
            deleted_user_id: null,
            id,
        },
    });

    return book;
};

const findBookByTitle = async (title) => {
    const book = await prisma.book.findMany({
        select: {
            id: true,
            input_time: true,
            input_user_id: true,
            title: true,
            author: true,
            publication_year: true,
            isbn: true,
            page_count: true,
            publisher: true,
            genre: true,
            synopsis: true,
        },
        where: {
            deleted_user_id: null,
            title: {
                contains: title,
                mode: "insensitive",
            },
        },
    });

    return book;
};

const insertBook = async (bookData) => {
    const book = await prisma.book.create({
        data: {
            input_time: new Date(),
            input_user_id: bookData.input_user_id,
            title: bookData.title,
            author: bookData.author,
            publication_year: bookData.publication_year,
            isbn: bookData.isbn,
            page_count: bookData.page_count,
            publisher: bookData.publisher,
            genre: bookData.genre,
            synopsis: bookData.synopsis,
        },
    });

    return book;
};

const deleteBook = async (id, inputUserId) => {
    const book = await prisma.book.update({
        where: {
            id,
        },
        data: {
            deleted_time: new Date(),
            deleted_user_id: inputUserId,
        },
    });

    return book;
};

const editBook = async (id, bookData) => {
    const book = await prisma.book.update({
        where: {
            id,
        },
        data: {
            mod_time: new Date(),
            mod_user_id: bookData.mod_user_id,
            title: bookData.title,
            author: bookData.author,
            publication_year: bookData.publication_year,
            isbn: bookData.isbn,
            page_count: bookData.page_count,
            publisher: bookData.publisher,
            genre: bookData.genre,
            synopsis: bookData.synopsis,
        },
    });

    return book;
};

module.exports = {
    findBooks,
    findBookById,
    findBookByTitle,
    insertBook,
    deleteBook,
    editBook,
};
