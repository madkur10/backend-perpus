const { prisma, prismaRawQuery } = require("../db");

const findLoans = async () => {
    const rawQuery = prismaRawQuery.sql`
        SELECT 
            "Loan".id,
            "Loan".deleted_user_id,
            "Loan".book_id,
            "Book".title,
            "Loan".user_id,
            "Users".first_name,
            "Users".last_name,
            "Loan".checkout_date,
            "Loan".due_date,
            "Loan".return_date,
            "Loan".fine_amount,
            "Loan".status_payment
        FROM 
            "Loan" 
        inner join "Book" on
            "Loan".book_id = "Book".id
        inner join "Users" on
            "Loan".user_id = "Users".id`;
    const loans = await prisma.$queryRaw(rawQuery);

    return loans;
};

const findLoanById = async (id) => {
    const rawQuery = prismaRawQuery.sql`
        SELECT 
            "Loan".id,
            "Loan".deleted_user_id,
            "Loan".book_id,
            "Book".title,
            "Loan".user_id,
            "Users".first_name,
            "Users".last_name,
            "Loan".checkout_date,
            "Loan".due_date,
            "Loan".return_date,
            "Loan".fine_amount,
            "Loan".status_payment
        FROM 
            "Loan" 
        inner join "Book" on
            "Loan".book_id = "Book".id
        inner join "Users" on
            "Loan".user_id = "Users".id
        WHERE 
            "Loan".id = ${id}`;
    const loan = await prisma.$queryRaw(rawQuery);

    return loan;
};

const findLoanByCheckoutDate = async (startDate, endDate) => {
    const rawQuery = prismaRawQuery.sql`
        SELECT 
            "Loan".id,
            "Loan".deleted_user_id,
            "Loan".book_id,
            "Book".title,
            "Loan".user_id,
            "Users".first_name,
            "Users".last_name,
            "Loan".checkout_date,
            "Loan".due_date,
            "Loan".return_date,
            "Loan".fine_amount,
            "Loan".status_payment
        FROM 
            "Loan" 
        inner join "Book" on
            "Loan".book_id = "Book".id
        inner join "Users" on
            "Loan".user_id = "Users".id
        WHERE 
            "Loan".checkout_date::date between ${startDate} AND ${endDate}`;
    const loan = await prisma.$queryRaw(rawQuery);

    return loan;
};

const insertLoan = async (loanData) => {
    const loan = await prisma.loan.create({
        data: {
            input_time: new Date(),
            input_user_id: loanData.input_user_id,
            book_id: loanData.book_id,
            user_id: loanData.user_id,
            due_date: loanData.due_date,
        },
    });

    return loan;
};

const deleteLoan = async (id, inputUserId) => {
    const loan = await prisma.loan.update({
        where: {
            id,
        },
        data: {
            deleted_time: new Date(),
            deleted_user_id: inputUserId,
        },
    });

    return loan;
};

const editLoan = async (id, loanData) => {
    let due_date;
    if (loanData.due_date) {
        due_date = new Date(loanData.due_date);
    }

    let return_date;
    if (loanData.return_date) {
        return_date = new Date(loanData.return_date);
    }
    const loan = await prisma.loan.update({
        where: {
            id,
        },
        data: {
            mod_time: new Date(),
            mod_user_id: loanData.mod_user_id,
            book_id: loanData.book_id,
            user_id: loanData.user_id,
            due_date: due_date,
            return_date: return_date,
            fine_amount: loanData.fine_amount,
            status_payment: loanData.status_payment,
        },
    });

    return loan;
};

module.exports = {
    findLoans,
    findLoanById,
    findLoanByCheckoutDate,
    insertLoan,
    deleteLoan,
    editLoan,
};
