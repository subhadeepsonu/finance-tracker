"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { getAllTransactions } from "@/app/actions/transactions"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import TransactionCard from "../ui/cards/transacsion"
import AddTransactionDialog from "../ui/forms/add-transaction"

export default function TransactionsDashboard({
    userId,
    incomeSourceId,
}: {
    userId: string
    incomeSourceId: string
}) {
    const [addOpen, setAddOpen] = useState(false)

    const { data: transactions, isLoading, error } = useQuery({
        queryKey: ["transactions", incomeSourceId],
        queryFn: () => getAllTransactions(userId, incomeSourceId),
    })

    if (isLoading) return (
        <div className="h-screen w-full flex justify-center items-center">
            <Spinner />
        </div>
    )

    if (error) return (
        <div className="h-screen w-full flex justify-center items-center text-red-500">
            Error: {error.message}
        </div>
    )

    return (
        <div className="min-h-screen w-full pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your transactions</p>
                    </div>
                    <Button
                        onClick={() => setAddOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Transaction
                    </Button>
                </div>

                {/* Content */}
                {transactions && transactions.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {transactions.map((transaction) => (
                            <TransactionCard
                                key={transaction.id}
                                transaction={transaction}
                                userId={userId}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center h-[60vh] gap-3">
                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <Plus className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-slate-500 text-base">
                            No transactions yet. Add one to get started.
                        </p>
                    </div>
                )}

            </div>

            <AddTransactionDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                userId={userId}
                incomeSourceId={incomeSourceId}
            />
        </div>
    )
}