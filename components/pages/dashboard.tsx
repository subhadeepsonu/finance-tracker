"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { getAllIncomes } from "@/app/actions/Income"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import IncomeCard from "../ui/cards/income-card"
import AddIncomeDialog from "../ui/forms/add-income"

export default function DashBoard(props: { userId: string }) {
    const [addOpen, setAddOpen] = useState(false)

    const { data: incomes, isLoading, error } = useQuery({
        queryKey: ["incomeSources"],
        queryFn: () => getAllIncomes(props.userId),
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
                        <h1 className="text-3xl font-bold text-slate-900">Income Buckets</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your income sources</p>
                    </div>
                    <Button
                        onClick={() => setAddOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Bucket
                    </Button>
                </div>

                {/* Content */}
                {incomes && incomes.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {incomes.map((income) => (
                            <IncomeCard
                                key={income.id}
                                income={income}
                                userId={props.userId}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center h-[60vh] gap-3">
                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <Plus className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-slate-500 text-base">
                            No income buckets yet. Add one to get started.
                        </p>
                    </div>
                )}

            </div>

            <AddIncomeDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                userId={props.userId}
            />
        </div>
    )
}