"use server"
import { TransactionType } from "@/generated/client";
import { prisma } from "@/lib/prisma";

export async function getAllTransactions(userId: string, sourceId: string) {
    try {
        const resp = await prisma.incomeSource.findUnique({
            where: {
                id: sourceId,
                userId
            },
            include: {
                transactions: {
                    where: {
                        IsActive: true
                    },
                    orderBy: {
                        CreatedAt: "desc"
                    },
                }
            },
        })
        let expense = 0;
        let income = 0;
        for (const tx of resp?.transactions || []) {
            if (tx.Type === "EXPENSE") {
                expense += tx.amount;
            } else {
                income += tx.amount;
            }
        }
        return {
            transactions: resp?.transactions || [],
            income,
            expense
        }
    }
    catch (error) {
        console.error("Error fetching transactions:", error);
        throw new Error("Failed to fetch transactions");
    }
}

export async function createTransaction(userId: string, incomeSourceId: string, amount: number, categoryId: string, Type: TransactionType) {
    try {
        console.log("Creating transaction with:", { userId, incomeSourceId, amount, categoryId, Type })
        const resp = await prisma.transaction.create({
            data: {
                userId,
                incomeSourceId,
                amount,
                categoryId,
                Type
            }
        })
        return resp
    }
    catch (error) {
        console.error("Error creating transaction:", error);
        throw new Error("Failed to create transaction");
    }
}

export async function updateTransaction(userId: string, transactionId: string, amount: number, categoryId: string, Type: TransactionType) {
    try {
        const resp = await prisma.transaction.updateMany({
            where: {
                id: transactionId,
                userId
            },
            data: {
                amount,
                categoryId,
                Type
            }
        })
        return resp
    }
    catch (error) {
        console.error("Error updating transaction:", error);
        throw new Error("Failed to update transaction");
    }
}

export async function deleteTransaction(userId: string, transactionId: string) {
    try {
        const resp = await prisma.transaction.update({
            where: {
                id: transactionId,
                userId
            },
            data: {
                IsActive: false
            }
        })
        return resp
    }
    catch (error) {
        console.error("Error deleting transaction:", error);
        throw new Error("Failed to delete transaction");
    }
}
