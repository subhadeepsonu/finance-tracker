"use client"

import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteIncome } from "@/app/actions/Income"

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

export default function DeleteIncomeDialog({
    open,
    onOpenChange,
    incomeId,
    incomeName,
    userId,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    incomeId: string
    incomeName: string
    userId: string
}) {
    const queryClient = useQueryClient()

    const { mutate: deleteIncome, isPending } = useMutation({
        mutationFn: async () => {
            return await DeleteIncome({ userId, incomeId })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["incomeSources"] })
            toast.success("Income source deleted.")
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
                    <AlertDialogTitle>Delete Income Source</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <strong>{incomeName}</strong>?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={() => deleteIncome()}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}