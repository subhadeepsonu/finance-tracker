-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "IsActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "IncomeSource" ADD COLUMN     "IsActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "IsActive" BOOLEAN NOT NULL DEFAULT true;
