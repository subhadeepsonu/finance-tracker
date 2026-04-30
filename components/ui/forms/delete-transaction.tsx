"use client"

import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTransaction } from "@/app/actions/transactions"

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

export default function DeleteTransactionDialog({
    open,
    onOpenChange,
    transactionId,
    userId,
    incomeSourceId,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    transactionId: string
    userId: string
    incomeSourceId: string
}) {
    const queryClient = useQueryClient()

    const { mutate: deleteTransactionMutate, isPending } = useMutation({
        mutationFn: async () => {
            return await deleteTransaction(userId, transactionId)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["transactions", incomeSourceId] })
            toast.success("Transaction deleted.")
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
                    <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this transaction? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={() => deleteTransactionMutate()}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}