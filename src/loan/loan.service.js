const {
    findLoans,
    findLoanById,
    insertLoan,
    deleteLoan,
    editLoan,
    findLoanByCheckoutDate
} = require("./loan.repository");

const getAllLoan = async () => {
    const loans = await findLoans();

    if (loans.length === 0) {
        throw Error("Loan is empty");
    }

    return loans;
};

const getLoanById = async (id) => {
    const loan = await findLoanById(id);

    if (loan.length === 0) {
        throw Error("Loan not found.");
    }
    
    if(loan[0].deleted_user_id) {
        throw Error("The loan is already in a canceled status.");
    }

    return loan;
};

const getLoanByCheckoutDate = async (startDate, endDate) => {
    const loan = await findLoanByCheckoutDate(startDate, endDate);

    if (loan.length === 0) {
        throw Error("Loan not found.");
    }

    return loan;
};

const createLoan = async (newLoanData) => {
    const loan = await insertLoan(newLoanData);

    return loan;
};

const deleteLoanById = async (id, inputUserId) => {
    await getLoanById(id);

    await deleteLoan(id, inputUserId);
};

const editLoanById = async (id, loanData) => {
    await getLoanById(id);

    const loan = await editLoan(id, loanData);

    return loan;
};

module.exports = {
    getAllLoan,
    getLoanById,
    getLoanByCheckoutDate,
    createLoan,
    deleteLoanById,
    editLoanById,
}