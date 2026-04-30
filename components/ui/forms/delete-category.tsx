"use client"

import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCategory } from "@/app/actions/category"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"

export default function DeleteCategoryDialog({
    open,
    onOpenChange,
    categoryId,
    categoryName,
    userId,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    categoryId: string
    categoryName: string
    userId: string
}) {
    const queryClient = useQueryClient()

    const { mutate: deleteCategoryMutate, isPending } = useMutation({
        mutationFn: async () => {
            return await deleteCategory({ userId, categoryId })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["categories"] })
            toast.success("Category deleted.")
            onOpenChange(false)
        },
        onError: (error) => {
            toast.error(`Failed to delete: ${error.message}`)
        },
    })

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Category</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <strong>{categoryName}</strong>?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={() => deleteCategoryMutate()}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}