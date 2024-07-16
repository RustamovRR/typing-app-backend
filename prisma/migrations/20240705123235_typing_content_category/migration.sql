/*
  Warnings:

  - The `content` column on the `TypingContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TypingContent" ADD COLUMN     "typingContentCategoryId" INTEGER,
DROP COLUMN "content",
ADD COLUMN     "content" TEXT[];

-- CreateTable
CREATE TABLE "TypingContentCategory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TypingContentCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TypingContent" ADD CONSTRAINT "TypingContent_typingContentCategoryId_fkey" FOREIGN KEY ("typingContentCategoryId") REFERENCES "TypingContentCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
