/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `User` table. All the data in the column will be lost.
  - The required column `id` was added to the `VerificationToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "expires_in" INTEGER;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "sessionToken" DROP NOT NULL,
ALTER COLUMN "expires" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageUrl",
ADD COLUMN     "image" TEXT DEFAULT 'DEFAULT_USER.jpg';

-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id");
