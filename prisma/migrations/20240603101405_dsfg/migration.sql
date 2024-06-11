/*
  Warnings:

  - You are about to drop the `OAuthDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OAuthDetails" DROP CONSTRAINT "OAuthDetails_userId_fkey";

-- DropTable
DROP TABLE "OAuthDetails";
