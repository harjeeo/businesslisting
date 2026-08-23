-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "hours" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "source" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "sourceUrl" TEXT NOT NULL DEFAULT '';
