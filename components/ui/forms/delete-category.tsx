"use client"

import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCategory } from "@/app/actions/category"
import { Trash2 } from "lucide-react"

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
            <AlertDialogContent className="rounded-2xl p-6 shadow-lg">
                <AlertDialogHeader className="mb-2">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                            <Trash2 className="w-5 h-5 text-red-500" />
                        </div>
                        <AlertDialogTitle className="text-xl font-bold text-slate-900">
                            Delete Category
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-sm text-slate-500">
                        Are you sure you want to delete{" "}
                        <strong className="text-slate-700">{categoryName}</strong>?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-4 gap-2">
                    <AlertDialogCancel className="rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50">
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={() => deleteCategoryMutate()}
                        disabled={isPending}
                        className="rounded-lg bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}