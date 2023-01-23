/*
  Warnings:

  - Added the required column `position` to the `Salary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Salary" ADD COLUMN     "position" TEXT NOT NULL;
