"use server"
import { prisma } from "@/lib/prisma";

export async function getAllIncomes(userId: string) {
    try {
        const Incomes = await prisma.incomeSource.findMany({
            where: {
                userId,
                IsActive: true
            }
        })
        return Incomes;
    } catch (error) {
        console.error("Error fetching incomes:", error);
        throw new Error("Failed to fetch incomes");
    }
}

export async function AddIncome(params: { userId: string; name: string }) {
    try {
        const newIncome = await prisma.incomeSource.create({
            data: {
                userId: params.userId,
                name: params.name
            }
        })
        return newIncome;
    } catch (error) {
        console.error("Error adding income:", error);
        throw new Error("Failed to add income");
    }
}

export async function UpdateIncome(params: { userId: string; incomeId: string; name: string }) {
    try {
        const updatedIncome = await prisma.incomeSource.update({
            where: {
                id: params.incomeId,
                userId: params.userId
            },
            data: {
                name: params.name
            }
        })
        return updatedIncome;
    } catch (error) {
        console.error("Error updating income:", error);
        throw new Error("Failed to update income");
    }
}

export async function DeleteIncome(params: { userId: string; incomeId: string }) {
    try {
        const deletedIncome = await prisma.incomeSource.update({
            where: {
                id: params.incomeId,
                userId: params.userId
            },
            data: {
                IsActive: false
            }
        })
        return deletedIncome;
    } catch (error) {
        console.error("Error deleting income:", error);
        throw new Error("Failed to delete income");
    }
}
