"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { TransactionType } from "@/generated/client"
import { Button } from "@/components/ui/button"
import EditTransactionDialog from "../forms/edit-transaction"
import DeleteTransactionDialog from "../forms/delete-transaction"
import { Badge } from "../badge"

type Transaction = {
    id: string
    amount: number
    categoryId: string
    Type: TransactionType
    incomeSourceId: string
    category?: { name: string }
    createdAt?: Date | string
}

export default function TransactionCard({
    transaction,
    userId,
}: {
    transaction: Transaction
    userId: string
}) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const isIncome = transaction.Type === TransactionType.INCOME

    return (
        <>
            <div className="flex items-center justify-between border rounded-lg px-4 py-3 shadow-sm bg-white">
                <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-gray-800">
                        {transaction.category?.name ?? "Uncategorized"}
                    </span>
                    {transaction.createdAt && (
                        <span className="text-xs text-gray-400">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Badge variant={isIncome ? "default" : "destructive"}>
                        {isIncome ? "+" : "-"}₹{transaction.amount.toFixed(2)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {transaction.Type.charAt(0) + transaction.Type.slice(1).toLowerCase()}
                    </Badge>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditOpen(true)}
                        aria-label="Edit"
                    >
                        <Pencil className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteOpen(true)}
                        aria-label="Delete"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                </div>
            </div>

            <EditTransactionDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                transaction={transaction}
                userId={userId}
                incomeSourceId={transaction.incomeSourceId}
            />
            <DeleteTransactionDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                transactionId={transaction.id}
                userId={userId}
                incomeSourceId={transaction.incomeSourceId}
            />
        </>
    )
}