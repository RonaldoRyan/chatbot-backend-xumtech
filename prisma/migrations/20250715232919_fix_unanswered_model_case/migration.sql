/*
  Warnings:

  - You are about to drop the `unansweredQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "unansweredQuestion";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UnansweredQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
