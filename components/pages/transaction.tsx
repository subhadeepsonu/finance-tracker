"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Plus, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react"
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
            Error: {(error as Error).message}
        </div>
    )

    const income = transactions?.income ?? 0
    const expense = transactions?.expense ?? 0
    const balance = income - expense

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

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

                    {/* Income */}
                    <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Total Income</p>
                            <h2 className="text-2xl font-bold text-green-600 mt-1">
                                ₹{income}
                            </h2>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <ArrowUpRight className="text-green-600 w-5 h-5" />
                        </div>
                    </div>

                    {/* Expense */}
                    <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Total Expense</p>
                            <h2 className="text-2xl font-bold text-red-600 mt-1">
                                ₹{expense}
                            </h2>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                            <ArrowDownRight className="text-red-600 w-5 h-5" />
                        </div>
                    </div>

                    {/* Balance */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Net Balance</p>
                            <h2 className={`text-2xl font-bold mt-1 ${balance >= 0 ? "text-green-600" : "text-red-600"
                                }`}>
                                ₹{balance}
                            </h2>
                        </div>
                        <div className={`p-3 rounded-full ${balance >= 0 ? "bg-green-100" : "bg-red-100"
                            }`}>
                            <Wallet className={`w-5 h-5 ${balance >= 0 ? "text-green-600" : "text-red-600"
                                }`} />
                        </div>
                    </div>


                </div>

                {/* Transactions Grid */}
                {transactions && transactions.transactions.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {transactions.transactions.map((transaction) => (
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

            {/* Add Transaction Dialog */}
            <AddTransactionDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                userId={userId}
                incomeSourceId={incomeSourceId}
            />
        </div>
    )
}