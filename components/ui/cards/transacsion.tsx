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
            <div className="flex flex-col gap-3 border border-slate-200 rounded-xl px-4 py-4 shadow-sm bg-white hover:shadow-md transition-shadow">
                {/* Top row: category + date */}
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-slate-800">
                            {transaction.category?.name ?? "Uncategorized"}
                        </span>
                        {transaction.createdAt && (
                            <span className="text-xs text-slate-400">
                                {new Date(transaction.createdAt).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                    <Badge variant="outline" className="text-xs text-slate-500 border-slate-200">
                        {transaction.Type.charAt(0) + transaction.Type.slice(1).toLowerCase()}
                    </Badge>
                </div>

                {/* Bottom row: amount + actions */}
                <div className="flex items-center justify-between">
                    <Badge
                        variant={isIncome ? "default" : "destructive"}
                        className={isIncome
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                            : "bg-red-50 text-red-600 border-red-200 hover:bg-red-50"
                        }
                    >
                        {isIncome ? "+" : "-"}₹{transaction.amount.toFixed(2)}
                    </Badge>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditOpen(true)}
                            aria-label="Edit"
                            className="hover:bg-blue-50"
                        >
                            <Pencil className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteOpen(true)}
                            aria-label="Delete"
                            className="hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                    </div>
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