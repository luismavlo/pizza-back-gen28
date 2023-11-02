/*
  Warnings:

  - Added the required column `size` to the `pizza` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('PEQUENO', 'MEDIANO', 'GRANDE');

-- AlterTable
ALTER TABLE "pizza" ADD COLUMN     "size" "Size" NOT NULL;
