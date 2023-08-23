/*
  Warnings:

  - You are about to drop the column `recepit` on the `NftData` table. All the data in the column will be lost.
  - Added the required column `receipt` to the `NftData` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NftData" (
    "tokenId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userAddress" TEXT NOT NULL,
    "receipt" TEXT NOT NULL
);
INSERT INTO "new_NftData" ("tokenId", "userAddress") SELECT "tokenId", "userAddress" FROM "NftData";
DROP TABLE "NftData";
ALTER TABLE "new_NftData" RENAME TO "NftData";
CREATE UNIQUE INDEX "NftData_tokenId_key" ON "NftData"("tokenId");
CREATE UNIQUE INDEX "NftData_receipt_key" ON "NftData"("receipt");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
