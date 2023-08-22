-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "input_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "input_user_id" INTEGER NOT NULL,
    "mod_time" TIMESTAMP(3),
    "mod_user_id" INTEGER,
    "deleted_time" TIMESTAMP(3),
    "deleted_user_id" INTEGER,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "input_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "input_user_id" INTEGER NOT NULL,
    "mod_time" TIMESTAMP(3),
    "mod_user_id" INTEGER,
    "deleted_time" TIMESTAMP(3),
    "deleted_user_id" INTEGER,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publication_year" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "page_count" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "synopsis" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "input_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "input_user_id" INTEGER NOT NULL,
    "mod_time" TIMESTAMP(3),
    "mod_user_id" INTEGER,
    "deleted_time" TIMESTAMP(3),
    "deleted_user_id" INTEGER,
    "book_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "checkout_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3),
    "fine_amount" INTEGER NOT NULL DEFAULT 0,
    "status_payment" TEXT,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "input_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "input_user_id" INTEGER NOT NULL,
    "mod_time" TIMESTAMP(3),
    "mod_user_id" INTEGER,
    "deleted_time" TIMESTAMP(3),
    "deleted_user_id" INTEGER,
    "book_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "input_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "input_user_id" INTEGER NOT NULL,
    "mod_time" TIMESTAMP(3),
    "mod_user_id" INTEGER,
    "deleted_time" TIMESTAMP(3),
    "deleted_user_id" INTEGER,
    "book_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reservation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
