/*
  Warnings:

  - You are about to drop the column `description` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Tweet` table. All the data in the column will be lost.
  - Added the required column `content` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tweet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tweet" ("createdAt", "id", "image", "name", "updatedAt", "userId") SELECT "createdAt", "id", "image", "name", "updatedAt", "userId" FROM "Tweet";
DROP TABLE "Tweet";
ALTER TABLE "new_Tweet" RENAME TO "Tweet";
CREATE INDEX "Tweet_userId_idx" ON "Tweet"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
