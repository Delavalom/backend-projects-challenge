-- CreateTable
CREATE TABLE "Salary" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "specialisation" TEXT NOT NULL,
    "freq" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
