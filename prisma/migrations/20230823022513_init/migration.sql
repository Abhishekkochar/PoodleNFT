-- CreateTable
CREATE TABLE "NftData" (
    "tokenId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userAddress" TEXT NOT NULL,
    "recepit" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NftData_recepit_key" ON "NftData"("recepit");
