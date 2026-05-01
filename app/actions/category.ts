"use server"
import { prisma } from "@/lib/prisma";

export async function getAllCategories(userId: string) {
    try {
        const categories = await prisma.category.findMany({
            where: {
                userId: userId,
                IsActive: true
            },
            orderBy: {
                CreatedAt: "desc"
            }
        });
        return categories;
    } catch (error: any) {
        throw new Error(`Failed to get categories: ${error.message}`);
    }
}

export default async function addCategory(params: { userId: string; name: string }) {
    try {
        const newCategory = await prisma.category.create({
            data: {
                userId: params.userId,
                name: params.name
            }
        });
        return newCategory;
    } catch (error: any) {
        throw new Error(`Failed to add category: ${error.message}`);
    }
}

export async function updateCategory(params: { userId: string; categoryId: string; name: string }) {
    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: params.categoryId,
                userId: params.userId
            },
            data: {
                name: params.name
            }
        });
        return updatedCategory;
    } catch (error: any) {
        throw new Error(`Failed to update category: ${error.message}`);
    }
}

export async function deleteCategory(params: { userId: string; categoryId: string }) {
    try {
        const deletedCategory = await prisma.category.update({
            where: {
                id: params.categoryId,
                userId: params.userId
            },
            data: {
                IsActive: false
            }
        });
        return deletedCategory;
    } catch (error: any) {
        throw new Error(`Failed to delete category: ${error.message}`);
    }
}
