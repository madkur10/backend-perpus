const {
    findBooks,
    findBookById,
    insertBook,
    deleteBook,
    editBook,
    findBookByTitle
} = require("./book.repository");

const getAllBook = async () => {
    const books = await findBooks();

    if (books.length === 0) {
        throw Error("Books not found");
    }

    return books;
};

const getBookById = async (id) => {
    const book = await findBookById(id);

    if (!book) {
        throw Error("Book not found");
    }

    return book;
};

const getBookByTitle = async (title) => {
    const book = await findBookByTitle(title);

    if (!book) {
        throw Error("Book not found");
    }

    return book;
};

const createBook = async (newBookData) => {
    const book = await insertBook(newBookData);

    return book;
};

const deleteBookById = async (id, inputUserId) => {
    await getBookById(id);

    await deleteBook(id, inputUserId);
};

const editBookById = async (id, bookData) => {
    await getBookById(id);

    const book = await editBook(id, bookData);

    return book;
};

module.exports = {
    getAllBook,
    getBookById,
    createBook,
    deleteBookById,
    editBookById,
    getBookByTitle,
}