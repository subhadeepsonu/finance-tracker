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
        <div className="max-w-xl mx-auto mt-10 py-10 px-4 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Transactions</h1>
                <Button onClick={() => setAddOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>

            {transactions && transactions.length > 0 ? (
                <div className="space-y-2">
                    {transactions.map((transaction) => (
                        <TransactionCard
                            key={transaction.id}
                            transaction={transaction}
                            userId={userId}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-10">
                    No transactions yet. Add one to get started.
                </p>
            )}

            <AddTransactionDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                userId={userId}
                incomeSourceId={incomeSourceId}
            />
        </div>
    )
}