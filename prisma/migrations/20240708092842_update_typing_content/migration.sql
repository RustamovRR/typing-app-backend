/*
  Warnings:

  - You are about to drop the column `category` on the `TypingContent` table. All the data in the column will be lost.
  - You are about to drop the column `typingContentCategoryId` on the `TypingContent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TypingContent" DROP CONSTRAINT "TypingContent_typingContentCategoryId_fkey";

-- AlterTable
ALTER TABLE "TypingContent" DROP COLUMN "category",
DROP COLUMN "typingContentCategoryId",
ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "TypingContent" ADD CONSTRAINT "TypingContent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TypingContentCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
