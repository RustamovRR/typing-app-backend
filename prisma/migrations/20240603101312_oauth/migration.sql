-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" TEXT;

-- CreateTable
CREATE TABLE "OAuthDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "expiresIn" INTEGER,

    CONSTRAINT "OAuthDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthDetails_provider_providerId_key" ON "OAuthDetails"("provider", "providerId");

-- AddForeignKey
ALTER TABLE "OAuthDetails" ADD CONSTRAINT "OAuthDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
