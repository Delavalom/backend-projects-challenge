/*
  Warnings:

  - You are about to drop the column `range` on the `Salary` table. All the data in the column will be lost.
  - Added the required column `salary` to the `Salary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Salary" DROP COLUMN "range",
ADD COLUMN     "salary" TEXT NOT NULL,
ALTER COLUMN "freq" SET DATA TYPE TEXT;
